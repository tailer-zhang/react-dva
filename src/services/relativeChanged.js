import  URLS from '../utils/Urls';
import {relativeChangedRequest} from '../utils/commonRequestUtils';

export async function fetchCustomerList(params) {
  return relativeChangedRequest(URLS.FETCH_RELATIVE_CHANGED_CUSTOMER_LIST_URL,params);
}
