import verify from "../../src/application/usecase/verify";

test("Deve retornar o token verificado",async () => {
    const verification = new verify()
    const output = verification.execute("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiI0aCIsImlhdCI6MTY5MDE3MzI4OX0.9i6LQEJR_GEOohN13hKkViv74ohS1Aq1V20LtUv8AH0")
    expect(verification).toBeDefined()
})