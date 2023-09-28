const mapPointWithTemp = (pointTimestamp, tempData) => {
    const curPointTimestamp = new Date(pointTimestamp).getTime();
    for (let i = 0; i < tempData.Timestamp.length; i++) {
        let curTimestamp = new Date(tempData.Timestamp[i]).getTime();
        let nextTimestamp = new Date(tempData.Timestamp[i + 1]).getTime();
        if (curTimestamp <= curPointTimestamp && curPointTimestamp < nextTimestamp) {
            if (
                Math.abs(curPointTimestamp - curTimestamp) <
                Math.abs(curPointTimestamp - nextTimestamp)
            ) {
                return tempData.OutsideTemp[i];
            } else {
                return tempData.OutsideTemp[i + 1];
            }
        }
    }
};
export const transformData = (locData, tempData) => {
    let obj = {
        LocoType: '',
        LocoNumber: '',
        points: [],
    };
    if (locData.LocoType === tempData.LocoType && locData.LocoNumber === tempData.LocoNumber) {
        obj.LocoType = locData.LocoType;
        obj.LocoNumber = locData.LocoNumber;

        locData.Latitude.forEach((lat, i) => {
            if ((lat !== 'NA') & (locData.Longitude !== 'NA')) {
                obj.points.push([
                    lat,
                    locData.Longitude[i],
                    mapPointWithTemp(locData.Timestamp[i], tempData),
                ]);
            }
        });
    }
    console.log(obj);
    return obj;
};
