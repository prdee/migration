const studentClassHelper = (studentClasses) => {
    return studentClasses.map(({ eventTriggers, joinedAt, leftAt, attendedDurationInSeconds, attendedDuration,
      registerDate, rewatchCount, totalRewatchDuration, rewatch, isRegistered, platform, isFromAdmin, isActive,
      agoraData, class: eClass, student: studentId, id, _id ,allowRecordedClassVisibility}) => {
  
      const formattedDetails = {
        joinedAt : joinedAt || [],
        leftAt : leftAt || [],
        eventTriggers: eventTriggers || {},
        totalRewatchDurationInSeconds: totalRewatchDuration || 0,
        rewatchCount:rewatchCount || 0,
        rewatchData: rewatch || [],
        agoraData: agoraData || {},
        platform,
      };
  
      const details = (attendedDurationInSeconds !== 0 || rewatchCount !== 0 && rewatchCount) ? formattedDetails : {};
  
      return {
        eClass,
        student: studentId,
        attendedDurationInSeconds,
        details,
        registered: {
          status: isRegistered,
          date: registerDate,
        },
        isActive: isActive || true,
        allowRecordedClassVisibility: allowRecordedClassVisibility || true,
        isFromAdmin: isFromAdmin || false,
        _id,
      };
    });
  };
  
  module.exports = {
    studentClassHelper,
  };
  