import Email from "../../src/domain/entities/Email"
import User from "../../src/domain/entities/User"
import Endereco from "../../src/domain/entities/endereco"
test.skip("Deve criar um usuario valido",async () => {
    var endereco = {cidade: "Cacoal", estado:"RO", rua: "Dois de junho", bairro: "Clodoaldo",cep:"76963-540"}
    
    const data = await User.create("jao@gmail.com", "12344", "019.133.062-08", "Usuario comum", {isAdmin:true},endereco)
    console.log(data.user)
    expect(data.done).toBe(true)
})

test.skip("Deve dar erro de cpf invalido ao criar o usuario",async () => {
    var endereco = {cidade: "Cacoal", estado:"RO", rua: "Dois de junho", bairro: "Clodoaldo",cep:"76963-540"}
    
    const data = await User.create("jao@gmail.com", "12344", "01.133.062-08", "Usuario comum", {isAdmin:true},endereco)
    
    expect(data.done).toBe(false)
})

test.skip("Deve dar erro de CEP invalido ao criar o usuario",async () => {
    var endereco = {cidade: "Cacoal", estado:"RO", rua: "Dois de junho", bairro: "Clodoaldo",cep:"76963-50"}
    
    const data = await User.create("jao@gmail.com", "12344", "019.133.062-08", "Usuario comum", {isAdmin:true},endereco)
    
    expect(data.done).toBe(false)
})

test.skip("Deve dar erro de email invalido ao criar o usuario",async () => {
    var endereco = {cidade: "Cacoal", estado:"RO", rua: "Dois de junho", bairro: "Clodoaldo",cep:"76963-540"}
    
    const data = await User.create("jao@gmail.com", "12344", "01.133.062-08", "Usuario comum", {isAdmin:true},endereco)
    
    expect(data.done).toBe(false)
})