$(document).ready(async function () {
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const countWishList = await getWishList();
  if (countWishList.length !== 0) {
    countWishList.map((item) => {
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

                                      <div class="cart_item_price cart_info_col">
                                          <div class="cart_item_title">Giá</div>
                                          <div class="cart_item_text">${numberFormat.format(
                                            item.selling_price
                                          )}</div>
                                      </div>
                                        <div class="cart_item_total cart_info_col">
                                          <div class="cart_item_title">Hành Động</div>
                                          <div class="cart_item_text"></div>
                                          <a href="" class="btn btn-sm btn-danger deleteWishList" data-id="${
                                            item.product_id
                                          }">x</a>
                                           <a href="" class="btn btn-sm btn-danger cart_button2" data-id="${
                                             item.product_id
                                           }">Thêm vào giỏ</a>
                                      </div>
                                  </div>
                              </li>
                              <hr>

          `);
    });
    $(".cart_buttons").append(`
            <button type="button" class="button cart_button_clear clearAllWishList">Xóa toàn bộ</button>
        `);
  } else {
    Swal.fire({
      icon: "error",
      title: "Danh sách yêu thích còn trống !!!",
    });
  }

  async function deleteWishList(productId) {
    return await instance
      .delete(`/api/wishlist/removeWishList/${productId}`)
      .then((result) => {
        return result.data;
      });
  }

    async function destroyWishList() {
      return await instance
        .delete(`/api/wishlist/deleteWishList`)
        .then((result) => {
          return result.data;
        });
    }

  // xóa sản phẩm khỏi danh sách yêu thích
  let deleteElementWishList = document.querySelectorAll(".deleteWishList");
  for (let i = 0; i < deleteElementWishList.length; i++) {
    deleteElementWishList[i].addEventListener("click", async function (e) {
      e.preventDefault();
      const id = $(this).data("id");
      await deleteWishList(id).then((data) => {
        const { err } = data;
        if (err === 1) {
          Swal.fire({
            icon: "success",
            title: "Xóa thành công khỏi danh sách !!!!",
          }).then(() => {
            window.location.reload();
          });
        }
      });
    });
  }

  // xóa toàn bộ danh sách yêu thích
    let deleteAllWishList = document.querySelector(".clearAllWishList");
    if (deleteAllWishList) {
      deleteAllWishList.addEventListener("click", async function (e) {
       await destroyWishList()
       .then((data)=>{
             const { err } = data;
             if (err === 1) {
               Swal.fire({
                 icon: "success",
                 title: "Xóa thành công  !!!!",
               }).then(() => {
                 window.location.reload();
               });
             }
       })
      });
    }

    let btnCartButton = document.querySelector('.cart_button2')
    if(btnCartButton){
        $(".cart_button2").on("click", async function (e) {
          e.preventDefault();
          const id = $(this).data("id");
          const a = await addToCart(id);
          const b = await getCart();
          Promise.all([a, b]).then(async (data) => {
            if (data[0].status === 401 && data[1].status === 401) {
              return Swal.fire({
                icon: "error",
                title: "Vui lòng đăng nhập giúp em",
              });
            } else {
              await instance.setLocalCart(data[1]).then(async () => {
                const cart = await instance.getLocalCart();
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
                  title: "Thêm giỏ hàng thành công",
                });
              });
            }
          });
        });
    }
});
