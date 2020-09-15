// Invoice File
$(document).ready(()=> {

    // Function Call
    // Global variable
    // Load  Product to invoice page 
    var products_with_id_and_text = [];
    var customers_with_id_and_text = [];

    const LoadProductsFromApi = () => {
        $.get('/api/product', res => {
            let product_temp_item = [{id:'0', text:'Select Product'}];
            res.forEach((item, index) => {
                product_temp_item.push({
                    id:item._id,
                    text:item.name
                })
            })
            products_with_id_and_text =   product_temp_item  
            loadData();   
        })
    }


    const LoadCustomersFromApi = () => {
        $.get('/api/customer', res => {
            let customer_temp_item = [{id:'0', text:'Select customer'}];
            res.forEach((item, index) => {
                customer_temp_item.push({
                    id:item._id,
                    text:`${item.fname} ${item.lname}`
                })
            })
            customers_with_id_and_text =   customer_temp_item  
            loadCustomerToMainInvoice();   
        })
    }
    


    const loadData = () => {
        $('.invoice_product_items').select2({
            data:products_with_id_and_text,
            placeholder:'Loading product ...'
        });

        $('#invoice_product_items').select2('focus');
        $('#invoice_product_items').select2('open');
    }





    // Load Customer to Invoice page
    const loadCustomerToMainInvoice = () => {
        $('.invoice_customer_list').select2({
            data:customers_with_id_and_text,
            placeholder:'Loading Customer ...'
        });
    }


    // Function Call
    LoadProductsFromApi()
    LoadCustomersFromApi()
    loadCustomerToMainInvoice()
    loadData()


})

