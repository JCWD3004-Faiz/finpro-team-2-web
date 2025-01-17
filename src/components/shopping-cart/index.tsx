import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchCartItems, removeCartItem, changeItemQuantity, fetchCartVouchers, checkoutCart, redeemCartVoucher, redeemProductVoucher } from "@/redux/slices/cartSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from "next/router";
import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  user_id: number;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, user_id }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, cartPrice, loading, error, cartVouchers, cartId } = useSelector((state: RootState) => state.cart);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<string | undefined>(undefined);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isItemClickable, setIsItemClickable] = useState(false);  // Track if items should be clickable

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCartItems(user_id));
      dispatch(fetchCartVouchers(user_id));
    }
  }, [isOpen, user_id]);

  const handleRemoveItem = (cart_item_id: number) => {
    dispatch(removeCartItem({ user_id, cart_item_id }));
  };

  const handleQuantityChange = (cart_item_id: number, quantity: number) => {
    dispatch(changeItemQuantity({ user_id, cart_item_id, quantity }));
  };

  const handleToggleDiscount = () => {
    setIsDiscountOpen(!isDiscountOpen);
  };

  const handleCheckout = async () => {
    try {
      const result = await dispatch(checkoutCart(user_id)).unwrap();
      const orderId = result.order.order_id;
      alert("Checkout successful!");
      router.push(`/checkout/${orderId}`);
      onClose();
    } catch (error) {
      alert("Checkout failed: " + error);
    }
  };

  const handleApplyVoucher = async () => {
    if (!selectedVoucher) return;

    const voucher = JSON.parse(selectedVoucher);

    if (voucher.voucher_type === "PRODUCT_DISCOUNT") {
      setIsItemClickable(true);
    } else if (voucher.voucher_type === "CART_DISCOUNT") {
      await dispatch(redeemCartVoucher({ user_id, user_voucher_id: voucher.user_voucher_id, cart_id: cartId }));
      setIsDiscountApplied(true);
      setIsDiscountOpen(false);
    }
  };

  const handleItemClick = async (cart_item_id: number) => {
    if (!selectedVoucher) return;

    const voucher = JSON.parse(selectedVoucher);

    if (voucher.voucher_type === "PRODUCT_DISCOUNT" && isItemClickable) {
      await dispatch(redeemProductVoucher({ user_id, user_voucher_id: voucher.user_voucher_id, cart_item_id }));
      setIsDiscountApplied(true);
      setIsItemClickable(false);
      setIsDiscountOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black opacity-40 z-50"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full md:w-[30vw] w-[100vw] bg-white shadow-lg z-50 p-8 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 border-b border-black pb-4 -mx-8 px-8 text-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <button
              className="text-black text-3xl font-bold cursor-pointer"
              onClick={onClose}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
        {loading ? (
            <p className="text-gray-800">Loading...</p>
          ) : error ? (
            <p className="text-gray-800">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-800">Your cart is empty.</p>
          ) : (
        <div>
        <ScrollArea className="h-[330px] pr-4">
        <div className="text-gray-800 w-full sm:max-w-md flex flex-col">
            <div className="flex-1 overflow-auto">
            {cartItems.filter((item) => item).map((item) => (
            <div className={cn( "flex flex-col p-4 border shadow-sm mb-4", isItemClickable && "cursor-pointer bg-accent/100 hover:bg-accent/50")}
            onClick={() => handleItemClick(item.cart_item_id)}>
                <div key={item.cart_item_id} className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product_name || ""}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(parseInt(item.original_price)) || ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={(e) => {e.stopPropagation(); handleRemoveItem(item.cart_item_id)}}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation();
                      if (item.quantity > 1) handleQuantityChange(item.cart_item_id, item.quantity - 1)}}>
                      <Minus className="h-4 w-4" />
                    </Button>
                      <span className="w-8 text-center">{item.quantity || ""}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation();
                      handleQuantityChange(item.cart_item_id, item.quantity + 1)}}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-medium">{formatCurrency(parseInt(item.product_price)) || ""}</p>
                </div>
            </div>
            ))}
            </div>
        </div>
        </ScrollArea>
        {cartItems.length > 0 && (
        <div className="border-t pt-4 space-y-4 text-gray-800">    
          <div className="space-y-2">        
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(cartPrice) || ""}</span>
            </div>
          </div>          
        </div>
        )}
        <div className="space-y-2 mt-3">
          <Button
              onClick={handleToggleDiscount}
              variant="outline"
              className="w-full text-gray-800"
              disabled={isDiscountApplied}
            >
              Select Discount
              {isDiscountOpen ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
            {isDiscountOpen && (
              <div className="space-y-2 flex items-center text-gray-800">
                <Select
                  value={selectedVoucher}
                  onValueChange={(value) => setSelectedVoucher(value)}
                >
                  <SelectTrigger className="w-full ml-4 px-4 mt-2">
                    <SelectValue placeholder="Select voucher" />
                  </SelectTrigger>
                  <SelectContent>
                    {cartVouchers.map((voucher) => (
                      <SelectItem key={voucher.redeem_code} value={JSON.stringify(voucher)}>
                        {voucher.redeem_code} - {voucher.voucher_type}
                        <label className="ml-4 text-muted-foreground">
                            {voucher.discount_type === 'PERCENTAGE' ? (
                                `${voucher.discount_amount}% OFF`
                            ) : (
                                `${formatCurrency(voucher.discount_amount)} OFF`
                            )}
                        </label>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>                
                <Button className="ml-2" onClick={handleApplyVoucher}>
                  Apply
                </Button>
              </div>
            )}
              {isItemClickable && !isDiscountApplied && (
                <p className="text-sm text-muted-foreground mt-2 text-center" >
                  Please select a cart item.
                </p>
              )}
          <Button className="w-full mt-2" size="lg" onClick={handleCheckout} disabled={loading}>
            {loading ? "Processing..." : "Checkout"}
          </Button>
        </div>
        </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
