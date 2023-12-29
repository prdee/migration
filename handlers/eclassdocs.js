
const documentFormat =(documents)=> {
    return documents?.map((document)=>{
        const {
            isAdminUploaded,
            thumbnail,
            uploadedVia,
            fileData,
            size,
            src,
            name,
            format
        } = document;

        return {
            updloadedBy : isAdminUploaded  ? "admin" : "teacher",
            thumbnail,
            uploadedFrom : uploadedVia || 'local',
            fileData : fileData || {},
            size : size || 0,
            src : src,
            name : name,
            format : format
        }
    })
  }
const resourceData =(eClassDocs) =>{
    return eClassDocs.map((resource) => {
      const {
        isActive,
        createdAt,
        updatedAt,
        documents,
        class: eClass,
        presentations,
        videos,
        audios,
        notes,
        assignments,
        id
      } = resource;
      return {
        isActive: isActive || true,
        documents:  documentFormat(documents)|| [],
        eClass,
        presentations: documentFormat(presentations) || [],
        videos: documentFormat(videos) || [],
        audios: documentFormat(audios) || [],
        notes: documentFormat(notes) || [],
      };
    });
  }

  module.exports = {
    resourceData
  };
  



