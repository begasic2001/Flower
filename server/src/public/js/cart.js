$(document).ready(async function () {
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const cart = await instance.getLocalCart();
  const filtered = cart.filter((item) => item.total !== 0);
  const totalAmount = $(".order_total_amount");
  let total = 0;
  filtered.map((item) => {
    total += item.total;

    totalAmount.html(numberFormat.format(total));
    $(".cart_list").append(`<li class="cart_item clearfix elm_cart">
                                <div class="cart_item_image"><img src="${
                                  item.img_one
                                }" alt="" style="width:90px; height:90px"></div>
                                <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                    <div class="cart_item_quantity cart_info_col">
                                        <div class="cart_item_title">Tên Sản Phẩm</div>
                                        <div class="cart_item_text">${
                                          item.pro_name
                                        }</div>
                                    </div>
                                    <div class="cart_item_quantity cart_info_col">
                                        <div class="cart_item_title">Số Lượng</div>
                                        <div class="cart_item_text">
                                          <input type="number" value="${
                                            item.amount
                                          }" name="qty"" style="width:50px;" data-id="${item.id}">
                                        </div>
                                    </div>
                                    <div class="cart_item_price cart_info_col">
                                        <div class="cart_item_title">Giá</div>
                                        <div class="cart_item_text">${numberFormat.format(
                                          item.selling_price
                                        )}</div>
                                    </div>
                                    <div class="cart_item_total cart_info_col">
                                        <div class="cart_item_title">Tổng Tiền</div>
                                        <div class="cart_item_text totalInCart">${numberFormat.format(
                                          item.total
                                        )}</div>
                                    </div>
                                      <div class="cart_item_total cart_info_col">
                                        <div class="cart_item_title">Hành Động</div>
                                        <div class="cart_item_text"></div>
                                        <a href="" class="btn btn-sm btn-danger deleteCart" data-id="${
                                          item.id
                                        }">x</a>
                                    </div>             
                                </div>
                            </li>
                            <hr>
                            
        `);
  });
  async function updateCart2(productId, amount) {
    return await instance
      .post(`/api/cart/updateCart2/${productId}`, {
        amount: amount,
      })
      .then((result) => {
        return result.data;
      });
  }
  async function deleteCart(productId) {
    return await instance
      .post(`/api/cart/updateCart2/${productId}`, {
        amount: 0,
      })
      .then((result) => {
        return result.data;
      });
  }

  //'input[name="productId"]'
  let inputQty = document.querySelectorAll('input[name="qty"]');
  for (let i = 0; i < inputQty.length; i++) {
    inputQty[i].addEventListener("change", async function (e) {
      let amount = $(inputQty[i]).val();
      let productId = $(inputQty[i]).attr("data-id");
      const a = await updateCart2(productId, amount);
      const b = await getCart();
      Promise.all([a, b]).then(async (data) => {
        if (data[0].status === 401 && data[1].status === 401) {
          return Swal.fire({
            icon: "error",
            title: "Vui lòng đăng nhập giúp em",
          });
        } else {
          await instance.setLocalCart(data[1])
          .then(async () => {
            const cart = await instance.getLocalCart();
            const filtered = cart.filter((item) => item.id !== productId);
            return await instance.setLocalCart(filtered)
          })
          .then(()=>{
                let amount = 0;
                let total = 0;
                if (cart !== null) {
                  $.each(cart, async function (key, value) {
                    if (value !== undefined) {
                      amount += value.amount;
                      total += value.total;
                    }
                    countNumberCart.html(`<span>${amount}</span>`);
                    totalCart.html(total);
                  });
                }
                Swal.fire({
                  icon: "success",
                  title: "Cập nhật giỏ hàng thành công",
                }).then(() => {
                  window.location.reload();
                });
          })
       
        }
      });
    });
  }
 
  // xóa sản phẩm khỏi giỏ hàng
  let deleteElementCart = document.querySelectorAll('.deleteCart');
  for(let i =0;i < deleteElementCart.length ; i++){
    deleteElementCart[i].addEventListener('click',async function(e){
      e.preventDefault()
       const id = $(this).data("id");
       const a = await deleteCart(id);
       const b = await getCart();
       Promise.all([a, b]).then(async (data) => {
         if (data[0].status === 401 && data[1].status === 401) {
           return Swal.fire({
             icon: "error",
             title: "Vui lòng đăng nhập giúp em",
           });
         } else {
           await instance
             .setLocalCart(data[1])
             .then(async () => {
               const cart = await instance.getLocalCart();
               const filtered = cart.filter((item) => item.id !== id);
               return await instance.setLocalCart(filtered);
             })
             .then(() => {
               let amount = 0;
               let total = 0;
               if (cart !== null) {
                 $.each(cart, async function (key, value) {
                   if (value !== undefined) {
                     amount += value.amount;
                     total += value.total;
                   }
                   countNumberCart.html(`<span>${amount}</span>`);
                   totalCart.html(total);
                 });
               }
               Swal.fire({
                 icon: "success",
                 title: "Xóa sản phẩm khỏi giỏ hàng thành công !!!!",
               }).then(() => {
                 window.location.reload();
               });
             });
         }
       });
     })
  }
});
