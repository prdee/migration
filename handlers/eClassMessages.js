const convertMessages = (eClass)=>{
    return {
        eClass : eClass._id,
        messages : eClass.classMessages,
        createdAt : eClass.endDate
    }
}
module.exports = {
    convertMessages,
  };
  