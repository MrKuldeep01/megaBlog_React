import { Client } from "appwrite";
import config from "../../config/env";

// Single shared Client instance — every Appwrite service reuses this
// instead of each constructing/configuring its own.
const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export default client;
