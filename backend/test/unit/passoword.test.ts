import PasswordGenerate from "../../src/domain/entities/PasswordGenerate"
test.skip("Deve retornar uma senha hasheda", async ()=>{
    const passwordHash = await PasswordGenerate.create("12344567");

    console.log(passwordHash);

    expect(passwordHash).toBeDefined()
})