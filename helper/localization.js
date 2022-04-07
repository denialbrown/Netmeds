const Message ={
    INVALID_PHONE_NUMBER: "enter valid phone number",
    SOMETHING_WENT_WRONG: "something went wrong",
    OTP_IS_REQUIRED:"otp is required",
    TOKEN_IS_REQUIRED:"token is reuired",
    OTP_INVALID:"otp invalid",
    TOKEN_INVALID:"token is invalid",
    USER_LOGIN_SUCCESS:"user login successfully",
    FIRST_NAME_IS_REQUIRED:"first name is required",
    LAST_NAME_IS_REQUIRED:"last name is required",
    EMAIL_IS_REQUIRED:"email is consider email format",
    GENDER_IS_REQUIRED:"gernder is required",
    AGE_IS_REQUIRED:"age is  required",
    ENTER_VALID_GENDER:"enter valid gender",
    MINIMUM_CHARACTER_FIRSTNAME:"enter first name in minimum 3 Character",
    MINIMUM_CHARACTER_LASTNMAE:"enter last name in minimum 3 Character",
    EMAIL_FORMAT:"enter email in email format",
    USER_SIGNUP_SUCCESS:"userprofile created sucessfully",
    ADDRESS_IS_REQUIRED:"address is required",
    LANDMARK_IS_REQUIRED:"landMark is required",
    CITY_IS_REQUIRED:"city name is required",
    STATE_IS_REQUIRED:"state name is required",
    PINCODE_IS_REQUIRED:"pincode is required",
    USER_ADDRESSES:"address listed sucessfully",
    USER_ADDRESS_NOT_FOUND:"user address not found",
    INVALID_ADDRESS_ID:"invalid addressId",
    ADDRESS_NOT_FOUND:"address not found",
    ADDRESS_ADD_SUCCESS:"address added sucessfully",
    ADDRESS_DELETE_SUCESSFULLY:"address delete sucessfully",
    PRIMARY_ADDRESS:"This is primamry address",
    ADDRESS_UPDATE_SUCCESS:"address updated sucessfully",
    CATEGORY_ADDED:"category added sucessfully",
    PRODUCT_ADD_SUCCESS:"product added sucessfully",
    PRODUCT_NOT_FOUND:"product not found",
    PRODUCT_UPDATE_SUCCESS:"product updated sucessfully",
    PRODUCT_LIST:"product listed sucessfully",
    PRODUCT_NOT_FOUND:"product not found",
    PRODUCT_DELETE:"product deleted sucessfully",
    IMAGE_REQUIRED:"image is required",
    CATEGORY_UPDATED:"category updated sucessfully",
    CATEGORY_LIST:"category listed sucessfully",
    CATEGORY_DELETED:"category deleted sucessfully"
}


const Action = {
    ACCESS: "access",
    LOGIN: "login",
};

module.exports = {
    Message,
    Action,
};