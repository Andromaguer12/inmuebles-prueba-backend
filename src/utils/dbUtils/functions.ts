const filterByDate = (date, query) => {
  const splitDate = date?.split('/');
  const transformQuery = [];

  if (splitDate?.length < 1) false;

  if (splitDate?.length === 2 && splitDate[1].length === 4) {
    if (splitDate[0]) {
      transformQuery.push({ $eq: [{ $month: `$${query}` }, Number(splitDate[0])] });
    }
    if (splitDate[1]) {
      transformQuery.push({ $eq: [{ $year: `$${query}` }, Number(splitDate[1])] });
    }

    return transformQuery;
  }

  if (splitDate?.length > 0) {
    if (splitDate[0]) {
      transformQuery.push({ $eq: [{ $dayOfMonth: `$${query}` }, Number(splitDate[0])] });
    }
    if (splitDate[1]) {
      transformQuery.push({ $eq: [{ $month: `$${query}` }, Number(splitDate[1])] });
    }
    if (splitDate[2]) {
      transformQuery.push({ $eq: [{ $year: `$${query}` }, Number(splitDate[2])] });
    }
  }

  return transformQuery;
};

function diacriticSensitiveRegex(string = '') {
  return string
    .toString()
    .toLowerCase()
    .replace(/[aA]/g, '[a,á,à,ä]')
    .replace(/[eE]/g, '[e,é,ë]')
    .replace(/[iI]/g, '[i,í,ï]')
    .replace(/[oO]/g, '[o,ó,ö,ò]')
    .replace(/[uU]/g, '[u,ü,ú,ù]');
}

export const generateQuery: (type, propName, value, queryCompare?: any) => any = (
  type,
  propName,
  value,
  queryCompare,
) => {
  if (!value || (typeof value === 'object' && Object.keys(value).length == 0)) return {};

  if (type === 'string') {
    return {
      [propName]: {
        $regex: diacriticSensitiveRegex(value.toString()),
        $options: 'i',
      },
    };
  } else if (type === 'date') {
    // const response = { $expr: { $and: [] } };
    // const convertResponse = filterByDate(new Date(value), propName);
    // response.$expr.$and.push(...convertResponse);
    return {
      [propName]: {
        $gte: new Date(value),
        $lte: new Date(new Date(value).getTime() + 24 * 60 * 60 * 1000),
      },
    };
  } else if (type === 'number') {
    const response = { [propName]: Number(value) };

    return response;
  } else if (type === 'switch') {
    if (value === 'true') {
      return {
        [propName]: queryCompare,
      };
    } else {
      return {};
    }
  } else if (type === 'boolean') {
    if (queryCompare.includes(value.toString().toUpperCase())) {
      return {
        [propName]: true,
      };
    } else {
      return {
        [propName]: {
          $ne: true,
        },
      };
    }
  } else if (type === 'ranges') {
    return {
      $or: [
        {
          $expr: {
            $and: [
              { $gte: [{ $toDouble: `$${propName}` }, value[0]] },
              { $lte: [{ $toDouble: `$${propName}` }, value[1]] },
            ],
          },
        },
      ].concat(
        queryCompare
          ? [
              {
                $expr: {
                  $and: [
                    { $gte: [{ $toDouble: `$${queryCompare}` }, value[0]] },
                    { $lte: [{ $toDouble: `$${queryCompare}` }, value[1]] },
                  ],
                },
              },
            ]
          : [],
      ),
    };
  } else if (type === 'compare') {
    return {
      $or: [{ [propName]: { $in: value } }].concat(queryCompare ? [{ [queryCompare]: { $in: value } }] : []),
    };
  } else if (type === 'stringArray') {
    return {
      [propName]: {
        $in: value,
      },
    };
  } else if (type === 'dateFromTo') {
    return {
      [propName]: {
        $gte: new Date(value.from),
        $lte: new Date(value.to),
      },
    };
  }
};
