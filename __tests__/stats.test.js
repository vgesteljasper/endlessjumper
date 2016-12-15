import * as statsUtils from '../src/js/functions/stats_utils';

describe(`Stats Client Library`, () => {
  it(`1 has a function called getFilteredDataBetween`, () => {
    expect(statsUtils.getFilteredDataBetween).toBeDefined();
  });
  it(`2 getFilteredDataBetween returns an empty array when called without parameters`, () => {
    expect(statsUtils.getFilteredDataBetween()).toEqual([]);
  });
  it(`3 getFilteredDataBetween returns an array with the original content when called with one parameter`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData)).toEqual(testData);
  });
  it(`4 getFilteredDataBetween returns objects after a given start date string (only date)`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, `2016-03-01`)).toEqual(expectedData);
  });
  it(`5 getFilteredDataBetween returns objects after a given start date string (date & time)`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, `2016-03-15 08:00:00`)).toEqual(expectedData);
  });
  it(`6 getFilteredDataBetween returns objects after a given start date string (date & time), with second precision`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, `2016-03-15 08:00:01`)).toEqual(expectedData);
  });
  it(`7 getFilteredDataBetween returns objects before a given end date string (only date)`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, false, `2016-03-15`)).toEqual(expectedData);
  });
  it(`8 getFilteredDataBetween returns objects before a given end date string (date & time)`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, false, `2016-03-15 10:00:00`)).toEqual(expectedData);
  });
  it(`9 getFilteredDataBetween returns objects before a given end date string (date & time), with second precision`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, false, `2016-03-15 07:59:59`)).toEqual(expectedData);
  });
  it(`10 getFilteredDataBetween returns objects between two date strings`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      },
      {
        created: `2016-03-24 00:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, `2016-03-14`, `2016-03-16`)).toEqual(expectedData);
  });
  it(`11 getFilteredDataBetween returns objects between two date strings (including time)`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      },
      {
        created: `2016-03-24 00:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, `2016-03-15 07:00:00`, `2016-03-15 09:00:00`)).toEqual(expectedData);
  });
  it(`12 getFilteredDataBetween returns objects between two date objects`, () => {
    const testData = [
      {
        created: `2016-01-01 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      },
      {
        created: `2016-03-15 15:00:00`,
        duration: 123
      },
      {
        created: `2016-03-24 00:00:00`,
        duration: 123
      }
    ];
    const expectedData = [
      {
        created: `2016-03-15 08:00:00`,
        duration: 123
      }
    ];
    expect(statsUtils.getFilteredDataBetween(testData, new Date(`2016-03-15 07:00:00`), new Date(`2016-03-15 09:00:00`))).toEqual(expectedData);
  });
});
