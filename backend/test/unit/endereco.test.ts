import endereco from "../../src/domain/entities/endereco"
test.skip("Deve retornar um endereço valido",async () => {
    const enderecoObj = {cidade: "Cacoal", estado:"RO", rua: "Dois de junho", bairro: "Clodoaldo",cep:"76963-540"}
    const Endereco = await endereco.formatedEnderco(enderecoObj);
    console.log(Endereco)
    expect(Endereco).toBeDefined();
})
test.skip("Deve dar cep invalido em um endereço",async () => {
    const enderecoObj = {cidade: "Cacoal", estado:"RO", rua: "Dois de junho", bairro: "Clodoaldo",cep:"76963-40"}
    const data = await endereco.formatedEnderco(enderecoObj);

    expect(data).toBe(false);
})