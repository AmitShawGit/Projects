import { useState } from "react";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useSelector } from "react-redux";

let ViewProduct = () => {
  let [modalClose, setModalClose] = useState(false)
  let [deleteModalClose, setDeleteModalClose] = useState(false)
  let [viewModalProduct, setViewModalProduct] = useState()

  let products = useSelector(state => state.products)
  console.log(products);


  let viewModal = (id) => {
    console.log(id);

    let specificProduct = products.filter(item => item.id == id)
    setViewModalProduct(specificProduct)
    console.log(specificProduct);
    setModalClose(true)
  }

  let goToEditProduct = (id) => {

  }

  let deleteModal = () => {
    setDeleteModalClose(true)
  }

  console.log(viewModalProduct);

  return (
    <>
      <div className="page-header">
        <h5>View Product</h5>
        <div className="searchbar">
          <input type="text" />
          <i className="ri-search-line"></i>
        </div>
        <p>Filter/Sort</p>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Sl No.</th>
              <th>SKU Code</th>
              <th>Product</th>
              <th>Stock</th>
              <th>CP</th>
              <th>SP</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {products.map((item, index) => {
              return (
                <tr key={index}>
                  <td><span className="status-ball status-green"></span></td>
                  <td>{index + 1}</td>
                  <td>{item.sku}</td>
                  <td>{item.productName}</td>
                  <td>{item.stocks} pc</td>
                  <td>${item.costPrice} / pc</td>
                  <td>${item.sellingPrice} / pc </td>
                  <td>
                    <i className="ri-eye-fill" onClick={() => viewModal(item.id)}></i>
                    <i className="ri-pencil-fill" onClick={() => goToEditProduct(1)}></i>
                    <i className="ri-delete-bin-4-fill" onClick={deleteModal}></i>
                  </td>
                </tr>
              )

            })}
            {/* <tr>
              <td><span className="status-ball status-green"></span></td>
              <td>1</td>
              <td>PRO4453</td>
              <td>Prosoft</td>
              <td>35 pc</td>
              <td>$10 / pc</td>
              <td>$25 / pc </td>
              <td>
                <i className="ri-eye-fill" onClick={viewModal}></i>
                <i className="ri-pencil-fill" onClick={() => goToEditProduct(1)}></i>
                <i className="ri-delete-bin-4-fill" onClick={deleteModal}></i>
              </td>
            </tr>
            <tr>
              <td><span className="status-ball status-progress"></span></td>
              <td>2</td>
              <td>PRO4453</td>
              <td>Prosoft</td>
              <td>35 pc</td>
              <td>$10 / pc</td>
              <td>$25 / pc </td>
              <td>
                <i className="ri-eye-fill"></i>
                <i className="ri-pencil-fill"></i>
                <i className="ri-delete-bin-4-fill"></i>
              </td>
            </tr>
            <tr>
              <td><span className="status-ball status-red"></span></td>
              <td>3</td>
              <td>PRO4453</td>
              <td>Prosoft</td>
              <td>35 pc</td>
              <td>$10 / pc</td>
              <td>$25 / pc </td>
              <td>
                <i className="ri-eye-fill"></i>
                <i className="ri-pencil-fill"></i>
                <i className="ri-delete-bin-4-fill"></i>
              </td>
            </tr> */}
          </tbody>
        </table>


      </div>

      {/* view modal  */}
      {modalClose && <Modal size="lg" header={
        <>
          <div className="d-flex align-center"> {viewModalProduct[0]?.productName} <div><span className="status-ball status-red"></span></div>
          </div>
        </>
      } onClose={() => setModalClose(false)}>

        <div className="row">
          <div className="col-md-3">
            <ul class="list-none pl-0">
              <li>SKU Code</li>
              <li>Cost Price</li>
              <li>Base Price</li>
              <li>Discount</li>
              <li>Selling Price</li>
              <li>Profit</li>
            </ul>
          </div>
          <div className="col-md-3">
     
            <ul class="list-none pl-0">
              <li>{viewModalProduct[0]?.sku}</li>
              <li>{viewModalProduct[0]?.costPrice}</li>
              <li>{viewModalProduct[0]?.basePrice}</li>
              <li>{viewModalProduct[0]?.discount}% ($140)</li>
              <li>$ {viewModalProduct[0]?.sellingPrice}</li>
              <li><span className="text-success">${viewModalProduct[0]?.sellingPrice - viewModalProduct[0]?.costPrice} (22%)</span></li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul class="list-none pl-0">
              <li>Stock Available</li>
              <li>Barcode</li>
              <li>Category</li>
              <li>Sale On</li>
              <li>Tags</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul class="list-none pl-0">
              <li>{viewModalProduct[0]?.stocks}</li>
              <li>{viewModalProduct[0]?.barcode}</li>
              <li>{viewModalProduct[0]?.category}</li>

              <li>Both</li>
              <li><ul class="d-flex list-none pl-0"><li class="hashTags">dvf</li></ul></li>
            </ul>
          </div>

        </div>
      </Modal>}

      {/* delete modal  */}
      {deleteModalClose && <Modal size="sm" header="Delete" onClose={() => setDeleteModalClose(false)} btnText="Delete">
        <ConfirmDelete resourcename="Product Nem" />
      </Modal>}

    </>
  );
};
export default ViewProduct;
