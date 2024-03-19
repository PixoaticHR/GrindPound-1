import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from "../../../components/reactTable";
import { ErrorBoundary } from "../../../components/error_boundaries";
import DeleteConfirm from "../ProfileAccount/deleteConfirm";
import { removeFromCart, updateCartItem } from '../../../reducers/cart/actions';
import { deleteCartItem, updateCartProducts } from '../../../services/checkout';
import { fetchCartList } from '../../public/Home';

const Checkout = (props) => {
    const [deleteId, setDeleteId] = useState(null);
    const cartStore = useSelector(state => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const checkModal = (show) => {
        console.log('show ==> ',show);
        if (show) {
            handleRemoveFromCart("Ship");
        };
        setShowModal(false);
    };

    const data = useMemo(
        () => cartStore.map(ele => {
            const amount = ele.quantity * parseFloat(ele.master_price);
            return { ...ele, amount: amount }
        })
    );

    const total = useMemo(() => data.reduce((t, val) => t + (val.amount), 0));

    const columns = useMemo(
        () => [
            {
                Header: "Product",
                accessor: "name",
                Cell: ({ row }) => (
                    <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-2">
                        <img src={row.original.attachment_url[0]} className="object-cover rounded-full lg:col-span-2 md:col-span-4 sm:col-span-4 h-12 " />
                        <div className="lg:col-span-10 md:col-span-8 sm:col-span-8 text-left"><span>{row.original.name}</span><br /><span>{row.original.net_wt + row.original.unit}</span></div>
                    </div>
                ),
            },
            {
                Header: "MRP",
                accessor: "master_price",
                Cell: ({ row }) => (
                    <span>₹ {row.original.master_price}</span>
                ),
            },
            {
                Header: "QTY",
                accessor: "quantity",
            },
            {
                Header: "Subtotal",
                accessor: "amount",
                Cell: ({ row }) => (
                    <span>₹ {row.original.amount}</span>
                ),
            },
            {
                Header: "Action",
                accessor: "status",
                Cell: ({ row }) => (
                    <div className="text-center">
                        <i className="fa fa-trash text-[#FF0000] cursor-pointer" aria-hidden="true" onClick={() => { setShowModal(true); setDeleteId(row.original) }}></i>
                    </div>
                ),
                disableSortBy: true,
            },
        ], []
    );

    console.log('deleteId ==> ', deleteId);

    const linkPage = (url) => {
        window.location.replace(window.location.origin + url);
    };

    const deleteHandler = (val) => {
        if (val) {
            props.setProductCart(deleteId, true);
        };
        setDeleteId(null);
    };

    const handleRemoveFromCart = (val) => {
        if (val?.type !== 'cart') {
            deleteCartItem(deleteId.id);
            dispatch(removeFromCart(deleteId.id));
        } else if (val.type == "cart") {
            deleteCartItem(val.id);
            dispatch(removeFromCart(val.id));
        };
        setDeleteId(null);
    };

    const handleUpdateCartItem = (productId, quantity) => {
        updateCartProducts(productId, { "quantity": quantity });
        dispatch(updateCartItem(productId, quantity));
    };


    return (
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-4 mt-40">
            <div className="lg:col-span-9 md:col-span-8 sm:col-span-12 m-1 mt-1">
                <span className='text-lg font-articulat font-semibold'>Check Out</span>
            </div>
            <div className="lg:col-span-3 md:col-span-4 sm:col-span-12 m-1 mt-1 bg-[#000000] text-[#FF0000] p-1 rounded text-sm p-2 font-articulat font-semibold">Free home delivery above Rs.399</div>
            <div className="lg:col-span-9 md:col-span-8 sm:col-span-12 m-1 mt-1">
                <ErrorBoundary>
                    <ReactTable
                        columns={columns}
                        data={data}
                        handleUpdateCartItem={handleUpdateCartItem}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />
                </ErrorBoundary>
            </div>

            {showModal && <DeleteConfirm setShowModal={(e) => checkModal(e)} message="Are You Sure.You want to delete ?" />}

            <div className="lg:col-span-3 md:col-span-4 sm:col-span-12 mt-1 p-1">
                <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 p-2">
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8'>Subtotal</span>
                    <span className='text-sm font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4'>₹{total}</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-2'><span>Enter Discount Code</span><br /><span className='text-xs font-normal'>You’re getting 15% discount</span></span>
                    <span className='text-xl font-articulat font-normal text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-3 cursor-pointer'>X</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-2'>Discount (Flat15)</span>
                    <span className='text-sm font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-2'>- ₹ {(total * 15) / 100}</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-2'>Total</span>
                    <span className='text-sm font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-2'>₹ {total - ((total * 15) / 100)}</span>
                    <span className='text-sm font-articulat font-semibold lg:col-span-6 md:col-span-6 sm:col-span-6 mt-2'>Shipping Cost</span>
                    <span className='text-xs font-articulat font-normal text-right lg:col-span-6 md:col-span-6 sm:col-span-6 mt-2 text-[#999999]'>Calculated at the next step</span>
                    <span className='text-lg font-articulat font-semibold lg:col-span-8 md:col-span-8 sm:col-span-8 mt-3'>Grand Total</span>
                    <span className='text-lg font-articulat font-semibold text-right lg:col-span-4 md:col-span-4 sm:col-span-4 mt-3'>₹ {total - ((total * 15) / 100)}</span>
                </div>
                <div className="m-1 mt-1 bg-[#009898] text-white rounded text-sm p-3 font-articulat font-semibold text-center cursor-pointer" onClick={() => linkPage("/shipping")}>Proceed to Checkout</div>
            </div>
        </div>
    )
}


export default Checkout;
