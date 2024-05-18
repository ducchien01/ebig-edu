export interface TestResultItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    exampleId?: string,
    customerId?: string,
    dateEnd?: number,
    dateStart?: number,
    score?: number
}

export interface TestResultDetailsItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    answerId?: string,
    testId?: string,
    result?: string,
    status?: number
}