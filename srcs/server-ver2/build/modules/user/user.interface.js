"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMerchantMessage = exports.ErrorUserMessage = void 0;
var ErrorUserMessage;
(function (ErrorUserMessage) {
    ErrorUserMessage["USER_NOT_FOUND"] = "User not found";
    ErrorUserMessage["USER_EXISTED"] = "User is existed";
    ErrorUserMessage["USER_NOT_CREATED"] = "User not created";
    ErrorUserMessage["USER_NOT_UPDATED"] = "User not updated";
    ErrorUserMessage["USER_NOT_DELETED"] = "User not deleted";
    ErrorUserMessage["USER_NOT_DELETED_ALL"] = "User not deleted all";
    ErrorUserMessage["USER_NOT_FOUND_OR_CREATED"] = "User not found or created";
    ErrorUserMessage["USER_NOT_UPDATED_PARTIAL"] = "User not updated partial";
})(ErrorUserMessage || (exports.ErrorUserMessage = ErrorUserMessage = {}));
var ErrorMerchantMessage;
(function (ErrorMerchantMessage) {
    ErrorMerchantMessage["MERCHANT_NOT_FOUND"] = "Merchant not found";
    ErrorMerchantMessage["MERCHANT_EXISTED"] = "Merchant is existed";
    ErrorMerchantMessage["MERCHANT_NOT_CREATED"] = "Merchant not created";
    ErrorMerchantMessage["MERCHANT_NOT_UPDATED"] = "Merchant not updated";
    ErrorMerchantMessage["MERCHANT_NOT_DELETED"] = "Merchant not deleted";
    ErrorMerchantMessage["MERCHANT_NOT_DELETED_ALL"] = "Merchant not deleted all";
    ErrorMerchantMessage["MERCHANT_NOT_FOUND_OR_CREATED"] = "Merchant not found or created";
    ErrorMerchantMessage["MERCHANT_NOT_UPDATED_PARTIAL"] = "Merchant not updated partial";
})(ErrorMerchantMessage || (exports.ErrorMerchantMessage = ErrorMerchantMessage = {}));
//# sourceMappingURL=user.interface.js.map