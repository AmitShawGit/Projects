import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addProducts } from "../../features/product";
import { useDispatch } from "react-redux";

let AddProduct = () => {
  let [showModal, setShowModal] = useState(false);
  let [currentTag, setCurrentTag] = useState()
  let [tags, setTags] = useState([])
  let [imgUrl, setImgUrl] = useState()

  const dispatch = useDispatch()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const basePrice = watch("basePrice");
  const discount = watch("discount")

  useEffect(() => {
    if (basePrice && discount) {
      const calculatedSellingPrice = basePrice - (basePrice * discount) / 100;
      setValue("sellingPrice", calculatedSellingPrice);
    }
  },
    [basePrice, discount, setValue])

  let handleTagChange = (e) => {
    setCurrentTag(e.target.value)
  }

  let handleSaveTag = (e) => {

    if (e.key === "Enter" && currentTag?.trim() !== "") {
      setTags((prevTags) => [...prevTags, currentTag?.trim()]);
      setCurrentTag("")

      e.preventDefault();
    }
  }

  let submitForm = (formvalue) => {
    // e.preventDefault();
    // console.log(e);

    dispatch(addProducts(formvalue))

    toast.success('Product Added')
  }

  // image preview 
  let takeMedia = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    setImgUrl(URL.createObjectURL(file))

  }
  let onerror = (theError) => {
    toast.error("Opps! You have missed some inputs")
  }

  return (
    <>
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit(submitForm, onerror)}>
        <div className="row addproducts">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5>General Information</h5>
                <label htmlFor="productname">Product Name</label>
                <input
                  type="text"
                  name=""
                  id="productname"
                  className="form-control"
                  {...register('productName', { required: "Enter product name" })}
                />
                {errors.productName?.message && (
                  <p className="error-text">{errors.productName.message}</p>
                )}
                <label htmlFor="productdesc">Product Description</label>
                <textarea
                  rows="3"
                  col="5"
                  className="form-control"
                  id="productdesc"
                  {...register('productDescription', { required: "Enter product description" })}
                ></textarea>
                {errors.productDescription?.message && (
                  <p className="error-text">{errors.productDescription.message}</p>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5>Pricing Information</h5>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="cp">Cost Price</label>
                    <input type="number" name="" id="cp" className="form-control"
                      {...register('costPrice', { required: "Enter cost price", min: { value: 1, message: "Cost price can't be 0" } })}
                    />
                    {errors.costPrice?.message && (
                      <p className="error-text">{errors.costPrice.message}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="bp">Base Price</label>
                    <input type="text" name="" id="bp" className="form-control"
                      {...register('basePrice', {
                        required: "Enter base price", min: { value: 1, message: "base price can't be 0" },

                        pattern: {
                          value: /^[0-9]+(\.[0-9]{1,2})?$/,
                          message: "Please enter a valid number"
                        }

                      })}
                    />
                    {errors.basePrice?.message && (
                      <p className="error-text">{errors.basePrice.message}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="discount">Discount (%)</label>
                    <input
                      type="text"
                      name=""
                      id="discount"
                      className="form-control"
                      {...register('discount', {
                        required: "Enter discount in percentage", min: { value: 1, message: "base price can't be 0" },

                        pattern: {
                          value: /^[0-9]+(\.[0-9]{1,2})?$/,
                          message: "Please enter a valid number"
                        }

                      })}

                    />

                    {errors.discount?.message && (
                      <p className="error-text">{errors.discount.message}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="sp">Selling Price</label>
                    <input
                      type="text"
                      name=""
                      id="sp"
                      className="form-control"
                      value={watch("sellingPrice" || 0)}
                      disabled

                    />

                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5>Stocks & SKU</h5>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="sku">SKU Code</label>
                    <input
                      type="text"
                      name=""
                      id="sku"
                      className="form-control"
                      {...register("sku", { required: "Enter SKU CODE", min: { value: 1 || String } })}
                    />
                    {errors.sku?.message && (
                      <p className="error-text">{errors.sku.message}</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="barcode">Barcode <i className="ri-barcode-line"></i></label>
                    <input
                      type="text"
                      name=""
                      id="barcode"
                      className="form-control"
                      {...register("barcode",
                        { required: "Barcode must be filled" }
                      )}
                    />
                    {errors?.barcode?.message && (<p className="error-text">{errors?.barcode?.message}</p>)}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="stocks">Stocks Available</label>
                    <input
                      type="text"
                      name=""
                      id="stocks"
                      className="form-control"
                      {...register("stocks",
                        { required: "Stocks must be filled", min: { value: 1, message: "Atleast one qtn required" } }
                      )}
                    />
                    {errors?.stocks?.message && (<p className="error-text">{errors?.stocks?.message}</p>)}

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>Product Media</h5>
                <label htmlFor="img" className="img-upload">
                  <input type="file" name="" id="img" className="d-none" onChange={takeMedia} />
                </label>
                {/* <img src={imgUrl} alt="" className="img-upload" /> */}

                <div className="d-flex justify-between">
                  <label htmlFor="img" className="img-upload-bottom">
                    <input type="file" name="" id="img" className="d-none" />
                  </label>
                  <label htmlFor="img" className="img-upload-bottom">
                    <input type="file" name="" id="img" className="d-none" />
                  </label>
                  <label htmlFor="img" className="img-upload-bottom">
                    <input type="file" name="" id="img" className="d-none" />
                  </label>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5>Category & Tags</h5>

                <label htmlFor="category">
                  Select Category
                  <i
                    className="ri-add-circle-line"
                    onClick={() => setShowModal(!showModal)}
                  ></i>
                </label>
                <select name="" id="category" className="form-control"
                  {...register("category",
                    { required: "category must be filled" }
                  )}
                >
                  <option value="">select</option>
                  <option value="mens">Men's wear</option>
                </select>
                {errors?.category?.message && (<p className="error-text">{errors?.category?.message}</p>)}

                <label htmlFor="tags">Set Tags</label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  className="form-control"
                  onInput={handleTagChange}
                  onKeyDown={handleSaveTag}
                  value={currentTag}
                // {...register("tags",
                //   { required: "tags must be filled" }
                // )}
                />
                <ul className="d-flex list-none">
                  {tags.map((item, index) => (<li key={index} className="hashTags">{item}</li>))}

                </ul>
                {errors?.tags?.message && (<p className="error-text">{errors?.tags?.message}</p>)}


                <label htmlFor="saleon">Sale on</label><br />
                <input type="radio" id="online" name="sale" className="form-check-input" /><label htmlFor="online">&nbsp; Online</label><br />
                <input type="radio" id="offline" name="sale" className="form-check-input" /><label htmlFor="offline">&nbsp; Offline</label><br />
                <input type="radio" id="both" name="sale" className="form-check-input" defaultChecked /> <label htmlFor="both" >&nbsp; Both Online & Offline</label>


                <button className="btn btn-primary float-right mt-3" type="submit">Save Product</button>

              </div>
            </div>
          </div>
        </div>

      </form>
      {showModal && <Modal header="Add Category" onClose={() => setShowModal(false)}>
        <input type="text" name="" id="categoryadd" className="form-control" />
      </Modal>}
    </>
  );
};
export default AddProduct;
