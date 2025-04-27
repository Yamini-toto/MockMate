import { pgTable, serial, text, varchar} from "drizzle-orm/pg-core"

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull(),
    createdBy:varchar('createdBy').notNull(),
}) 