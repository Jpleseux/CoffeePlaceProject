import category from "../../src/domain/entities/category"

test.skip("Deve criar uma categoria", async()=>{
    const input = new category("comida japonesa importadas","comida japonesa")
    const response = await fetch("http://localhost:3000/category/create",{
        method:"post",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(input)
    })

    expect(response).toBeDefined()
})

test.skip("Deve retornar uma categoria com base no seu id", async ()=>{
    const response = await fetch("http://localhost:3000/category/getcategory/64b745d64245c31819ac17da", {
        method:"get",
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const categorY = await response.text().then((data)=>{
        const recive = JSON.parse(data);
        return new category(recive.output.descriptionCategory, recive.output.nameCategory);
    });
    expect(categorY.descriptionCategory.toLowerCase()).toBe("comida italiana importadas")
});
test.skip("Deve dar erro de id invalido ao buscar categoria",  async ()=>{
    const response = await fetch("http://localhost:3000/category/getcategory/64b6d869d01e7a0cd5982aab", {
        method:"get",
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const categorY = await response.text().then((data)=>{
        const recive = JSON.parse(data);
        return recive
    })
    expect(categorY.output.msg.toLowerCase()).toBe('id não encontrado no banco de dados')
})
test.skip("Deve atualizar uma categoria",async () => {
    const Input = new category("Comida Coreana importada", "Comida Coreana")
    const response = await fetch("http://localhost:3000/category/update/64b745d64245c31819ac17da", {
        method:"PATCH",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Input)
    });

    expect(response).toBeDefined();
}) 
test.skip("Deve deletar categoria", async()=>{
    const response = await fetch("http://localhost:3000/category/delete/64b745d64245c31819ac17da", {
        method:"delete",
        headers:{
            'Content-Type': 'application/json'
        }
    })

    expect(response.status).toBe(201);
})