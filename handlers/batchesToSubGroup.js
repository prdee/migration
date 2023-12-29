
const convertDateToTimestamp = (date) =>{
    return Math.floor(new Date(date).getTime() / 1000);
  }
const convertBatchToSubgroup = (batch) => {
    const subgroup = {
      name: batch.name,
      isPaid: batch.subscription === 'paid',
      enrollmentCount: batch.batchEnrollmentCount || 0,
      enrollmentLimit: batch.batchEnrollmentLimit || 0,
      enrollmentStartDate: batch.enrollStartDate || 0,
      enrollmentEndDate: batch.enrollEndDate || 0,
      startDate: batch.startDate || 0,
      endDate: batch.endDate || 0,
      picture: batch.batchPicture || '',
      timings: batch.batchTimings || '',
      group: batch.course[0] || null,
      tenantId: [1],
      subTenantId: [],
      isActive: batch.isActive || false,
      createdAt: convertDateToTimestamp(batch.createdAt),
      updatedAt: convertDateToTimestamp(batch.updatedAt),
      oldId : batch._id,
      _id : batch._id
    };
  
    return subgroup;
  };

  module.exports = {
    convertBatchToSubgroup,
  };
  