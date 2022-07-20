import {combineReducers} from "redux";
import {addressSlice} from "./address/slice";
import {userSlice} from "./user/slice";
import {categorySlice} from "./category/slice";
import {topSlidesSlice} from "./home/slice";
import {contactUsSlice} from "./contact-us/slice";
import {faqSlice} from "./faq/slice";
import {newsLetterSlice} from "./news-letter/slice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    category: categorySlice.reducer,
    address: addressSlice.reducer,
    topSlides: topSlidesSlice.reducer,
    contactUs: contactUsSlice.reducer,
    faq: faqSlice.reducer,
    newsLetter: newsLetterSlice.reducer
})

export default rootReducer;
