$(function(){
    loadProducts()
    $("#products").on("click", ".btn-info", handleEdit)
    $("#products").on("click", ".btn-danger", handleDelete)
    $("#editSave").click(function(){
        var id = $("#editID").val()
        var name = $("#editName").val()
        var price = $("#editPrice").val()
        var color = $("#editColor").val()
        var department = $("#editDepartment").val()
        var description = $("#editDiscription").val()
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/"+id,
            data:{name, price, color, department, description},
            method: "PUT",
            error: function(response){
                var products = $("#products")
                products.html("An error occoured in edit")
            },
            success: function(){
                loadProducts()
                $("#editModal").modal("hide")
            }
        })
    })
    $("#addSave").click(addProduct)
})

function loadProducts(){
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET",
        error: function(response){
            var products = $("#products")
            products.html("An error occoured")
        },
        success: function(response){
            var products = $("#products")
            products.empty()
            for(var i=0; i<response.length; i++)
            {
                products.append(`<div class="product" data-id="${response[i]._id}"> <h2> Product ${(i+1)} <button class="btn btn-danger col-1 float-right">Delete</button> <button class="btn btn-info col-1 float-right">Edit</button> </h2> <p>Name: ${response[i].name} </p> <p>Price: ${response[i].price}</p> <p>Color: ${response[i].color}</p> <p>Department: ${response[i].department}</p> <p>Description: ${response[i].description}</p> </div>`)
            }
        }
    })
}

function addProduct(){
    var id = $("#editID").val()
    var name = $("#addName").val()
    var price = $("#addPrice").val()
    var color = $("#addColor").val()
    var department = $("#addDepartment").val()
    var description = $("#addDiscription").val()
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        data:{name, price, color, department, description},
        method: "POST",
        error: function(response){
            var products = $("#products")
            products.html("An error occoured in add new product")
        },
        success: function(){
            loadProducts()
            $("#addProductModal").modal("hide")
        }
    })
}

function handleEdit(){
    var btn = $(this)
    var parentDiv = btn.closest(".product")
    let id = parentDiv.attr("data-id")
    $.get("https://usman-recipes.herokuapp.com/api/products/"+id, function(response){
        $("#editID").val(response._id)
        $("#editName").val(response.name)
        $("#editPrice").val(response.price)
        $("#editColor").val(response.color)
        $("#editDepartment").val(response.department)
        $("#editDiscription").val(response.description)
        $("#editModal").modal("show")
    })
}
function handleDelete(){    
    var btn = $(this)
    var parentDiv = btn.closest(".product")
    let id = parentDiv.attr("data-id")
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/"+id,
        method: "DELETE",
        error: function(response){
            var products = $("#products")
            products.html("An error occoured in delete")
        },
        success: function(){
            loadProducts()
        }
    })
}