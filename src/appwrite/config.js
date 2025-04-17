import conf from '../conf/conf.js'
import { Client, Databases, Storage, Query, ID} from "appwrite";

export class Service {
  client = new Client();
  databases;
  buckets;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)

    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)

    } catch (error) {
      console.log("appwrite service :: getpost()::", error)
      return false
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite service :: getposts()::", error);
      return false;
    }
  }
  


  async createPost({ title, slug, content, featuredImage, status, userID }) {

    try {

      return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
        { title, content, featuredImage, status, userID },
       
      )

    } catch (error) {
      console.log("appwrite service :: createpost()::", error)
      alert('post creation failed')
      return false
    }

  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status })

    } catch (error) {
      console.log("appwrite service :: updatePost()", error)
      return false
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
      return true;
    } catch (error) {
      console.log("appwrite service :: deletePost()", error)
      return false
    }
  }
  //storage services 
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )

    } catch (error) {
      console.log("appwrite service :: uploadfile()", error)
      return false
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )

    } catch (error) {
      console.log("appwrite service :: deletefile()", error)
      return false
    }
  }

   getPic(fileId){
   const response= this.bucket.getFileView(
        conf.appwriteBucketId,
       fileId
    )
  // console.log("fileid passed::" , fileId , " type::" , typeof(fileId))
  // console.log("Response from function::" , response)
  return  response
}

}

const service= new  Service()
export default service;


