import { Doc } from "@/convex/_generated/dataModel";

export interface CreateProjectType
    extends Omit<Doc<"projects">, "_id" | "_creationTime" | "created_at"> { }
