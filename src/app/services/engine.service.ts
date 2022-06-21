import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentFacade } from 'app/http/facadeObjects/AppointmentFacade';
import { DiscountTypeFacade } from 'app/http/facadeObjects/Discounts/discount-type-facade';
import { DiscountTypeWrapper } from 'app/http/facadeObjects/Discounts/Wrappers/discount-type-wrapper';
import { PurchasePolicyTypeWrapper } from 'app/http/facadeObjects/Discounts/Wrappers/purchase-policy-type-wrapper';
import { Category, ItemFacade } from 'app/http/facadeObjects/ItemFacade';
import { MemberFacade } from 'app/http/facadeObjects/MemberFacade';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { ShopFacade } from 'app/http/facadeObjects/shop-facade';
import { ShoppingCartFacade } from 'app/http/facadeObjects/shopping-cart-facade';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';
import { AddDiscountToShopRequest } from 'app/http/requests/add-discount-to-shop-request';
import { AddItemToShopRequest } from 'app/http/requests/add-item-to-shop-request';
import { AddItemToShoppingCartRequest } from 'app/http/requests/add-item-to-shopping-cart-request';
import { AddPersonalQueryRequest } from 'app/http/requests/add-personal-query-request';
import { AddPurchasePolicyToShopRequest } from 'app/http/requests/add-purchase-policy-to-shop-request';
import { AppointmentShopManagerRequest } from 'app/http/requests/appointment-shop-manager-request';
import { AppointmentShopOwnerRequest } from 'app/http/requests/appointment-shop-owner-request';
import { BuyShoppingCartRequest } from 'app/http/requests/buy-shopping-cart-request';
import { ChangeShopItemInfoRequest } from 'app/http/requests/change-shop-item-info-request';
import { CloseShopRequest } from 'app/http/requests/close-shop-request';
import { EditItemFromShoppingCartRequest } from 'app/http/requests/edit-item-from-shopping-cart-request';
import { editItemRequest } from 'app/http/requests/edit-item-request';
import { EditShopManagerPermissionsRequest } from 'app/http/requests/edit-shop-manager-permissions-request';
import { ExitSystemRequest } from 'app/http/requests/exit-system-request';
import { GetAllSystemPurchaseHistoryRequest } from 'app/http/requests/get-all-system-purchase-history-request';
import { GetHistoryByMemberRequest } from 'app/http/requests/get-history-by-member-request';
import { GetManagerPermissionRequest } from 'app/http/requests/get-manager-permission-request';
import { GetPoliciesRequest } from 'app/http/requests/get-policies-request';
import { GetShopEmployeesRequest } from 'app/http/requests/get-shop-employees-request';
import { InitMarketRequest } from 'app/http/requests/init-market-request';
import { IsSystemManagerRequest } from 'app/http/requests/is-system-manager-request';
import { NamePasswordRequest } from 'app/http/requests/name-password-request';
import { OpenNewShopRequest } from 'app/http/requests/open-new-shop-request';
import { RemoveAppointmentRequest } from 'app/http/requests/remove-appointment-request';
import { RemoveDiscountFromShopRequest } from 'app/http/requests/remove-discount-from-shop-request';
import { RemoveItemFromShopRequest } from 'app/http/requests/remove-item-from-shop-request';
import { RemovePurchasePolicyFromShopRequest } from 'app/http/requests/remove-purchase-policy-from-shop-request';
import { RequestVisitorName } from 'app/http/requests/request-visitor-name';
import { SearchProductByNameRequest } from 'app/http/requests/search-product-by-name-request';
import { SetItemCurrentAmountRequest } from 'app/http/requests/set-item-current-amount-request';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { UpdateShopItemAmountRequest } from 'app/http/requests/update-shop-item-amount-request';
import { ValidateSecurityRequest } from 'app/http/requests/validate-security-request';
import { catchError, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class EngineService {
  private serverUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  firstInitMarket(request: InitMarketRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/firstInitMarket',
      request,
      httpOptions
    );
  }

  guestLogin(): Observable<ResponseT<VisitorFacade>> {
    return this.http.post<ResponseT<VisitorFacade>>(
      this.serverUrl + '/guestLogin',
      httpOptions
    );
  }

  exitSystem(request: ExitSystemRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/exitSystem',
      request,
      httpOptions
    );
  }

  register(request: NamePasswordRequest): Observable<ResponseT<boolean>> {
    return this.http.post<ResponseT<boolean>>(
      this.serverUrl + '/register',
      request,
      httpOptions
    );
  }
  addPersonalQuery(request: AddPersonalQueryRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/addPersonalQuery',
      request,
      httpOptions
    );
  }

  searchProductByName(
    request: SearchProductByNameRequest
  ): Observable<ResponseT<ItemFacade[]>> {
    return this.http.post<ResponseT<ItemFacade[]>>(
      this.serverUrl + '/searchProductByName',
      request,
      httpOptions
    );
  }

  searchProductByCategory(
    request: Category
  ): Observable<ResponseT<ItemFacade[]>> {
    return this.http.post<ResponseT<ItemFacade[]>>(
      this.serverUrl + '/searchProductByCategory',
      request,
      httpOptions
    );
  }

  searchProductByKeyword(
    request: SearchProductByNameRequest
  ): Observable<ResponseT<ItemFacade[]>> {
    return this.http.post<ResponseT<ItemFacade[]>>(
      this.serverUrl + '/searchProductByKeyword',
      request,
      httpOptions
    );
  }

  addItemToShoppingCart(
    request: AddItemToShoppingCartRequest
  ): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/addItemToShoppingCart',
      request,
      httpOptions
    );
  }

  showShoppingCart(
    request: RequestVisitorName
  ): Observable<ResponseT<ShoppingCartFacade>> {
    return this.http.post<ResponseT<ShoppingCartFacade>>(
      this.serverUrl + '/showShoppingCart',
      request,
      httpOptions
    );
  }

  editItemFromShoppingCart(
    request: EditItemFromShoppingCartRequest
  ): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/editItemFromShoppingCart',
      request,
      httpOptions
    );
  }
  calculateShoppingCart(
    request: RequestVisitorName
  ): Observable<ResponseT<ShoppingCartFacade>> {
    return this.http.post<ResponseT<ShoppingCartFacade>>(
      this.serverUrl + '/calculateShoppingCart',
      request,
      httpOptions
    );
  }

  buyShoppingCart(
    request: BuyShoppingCartRequest
  ): Observable<ResponseT<ShoppingCartFacade>> {
    return this.http.post<ResponseT<ShoppingCartFacade>>(
      this.serverUrl + '/buyShoppingCart',
      request,
      httpOptions
    );
  }

  memberLogin(request: NamePasswordRequest): Observable<ResponseT<String[]>> {
    return this.http.post<ResponseT<String[]>>(
      this.serverUrl + '/memberLogin',
      request,
      httpOptions
    );
  }

  validateSecurityQuestions(
    request: ValidateSecurityRequest
  ): Observable<ResponseT<MemberFacade>> {
    return this.http.post<ResponseT<MemberFacade>>(
      this.serverUrl + '/validateSecurityQuestions',
      request,
      httpOptions
    );
  }

  logout(request: RequestVisitorName): Observable<ResponseT<VisitorFacade>> {
    return this.http.post<ResponseT<VisitorFacade>>(
      this.serverUrl + '/logout',
      request,
      httpOptions
    );
  }
  openNewShop(request: OpenNewShopRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/openNewShop',
      request,
      httpOptions
    );
  }

  updateShopItemAmount(
    request: UpdateShopItemAmountRequest
  ): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/updateShopItemAmount',
      request,
      httpOptions
    );
  }

  removeItemFromShop(request: RemoveItemFromShopRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/removeItemFromShop',
      request,
      httpOptions
    );
  }

  addItemToShop(
    request: AddItemToShopRequest
  ): Observable<ResponseT<ShopFacade>> {
    return this.http.post<ResponseT<ItemFacade>>(
      this.serverUrl + '/addItemToShop',
      request,
      httpOptions
    );
  }

  setItemCurrentAmount(
    request: SetItemCurrentAmountRequest
  ): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/setItemCurrentAmount',
      request,
      httpOptions
    );
  }

  changeShopItemInfo(request: ChangeShopItemInfoRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/changeShopItemInfo',
      request,
      httpOptions
    );
  }
  editItemRequest(request: editItemRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/editItemRequest',
      request,
      httpOptions
    );
  }
  appointShopOwner(request: AppointmentShopOwnerRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/appointShopOwner',
      request,
      httpOptions
    );
  }
  appointShopManager(
    request: AppointmentShopManagerRequest
  ): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/appointShopManager',
      request,
      httpOptions
    );
  }
  editShopManagerPermissions(
    request: EditShopManagerPermissionsRequest
  ): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/editShopManagerPermissions',
      request,
      httpOptions
    );
  }

  getManagerPermission(
    request: GetManagerPermissionRequest
  ): Observable<ResponseT<AppointmentFacade>> {
    return this.http.post<ResponseT<AppointmentFacade>>(
      this.serverUrl + '/getManagerPermission',
      request,
      httpOptions
    );
  }

  closeShop(request: CloseShopRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/closeShop',
      request,
      httpOptions
    );
  }
  getShopEmployeesInfo(
    request: GetShopEmployeesRequest
  ): Observable<ResponseT<AppointmentFacade[]>> {
    return this.http.post<ResponseT<AppointmentFacade[]>>(
      this.serverUrl + '/getShopEmployeesInfo',
      request,
      httpOptions
    );
  }
  getShopInfo(request: TwoStringRequest): Observable<ResponseT<ShopFacade>> {
    return this.http.post<ResponseT<ShopFacade>>(
      this.serverUrl + '/getShopInfo',
      request,
      httpOptions
    );
  }
  getShopPurchaseHistory(
    request: TwoStringRequest
  ): Observable<ResponseT<string>> {
    return this.http.post<ResponseT<string>>(
      this.serverUrl + '/getShopPurchaseHistory',
      request,
      httpOptions
    );
  }
  getAllSystemPurchaseHistory(
    request: GetAllSystemPurchaseHistoryRequest
  ): Observable<ResponseT<string>> {
    return this.http.post<ResponseT<string>>(
      this.serverUrl + '/getAllSystemPurchaseHistory',
      request,
      httpOptions
    );
  }
  getHistoryByShop(request: TwoStringRequest): Observable<ResponseT<string>> {
    return this.http.post<ResponseT<string>>(
      this.serverUrl + '/getHistoryByShop',
      request,
      httpOptions
    );
  }

  getHistoryByMember(
    request: GetHistoryByMemberRequest
  ): Observable<ResponseT<string>> {
    return this.http.post<ResponseT<string>>(
      this.serverUrl + '/getHistoryByMember',
      request,
      httpOptions
    );
  }

  ////////////////////////////////// V2 /////////////////////////////////

  addDiscountToShop(request :AddDiscountToShopRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/addDiscountToShop',
      request,
      httpOptions
    );
  }
  removeDiscountFromShop(request: RemoveDiscountFromShopRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/removeDiscountFromShop',
      request,
      httpOptions
    );
  }
  addPurchasePolicyToShop(request: AddPurchasePolicyToShopRequest): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/addPurchasePolicyToShop',
      request,
      httpOptions
    );
  }
  removePurchasePolicyFromShop(request: RemovePurchasePolicyFromShopRequest): Observable<ResponseT<PurchasePolicyTypeWrapper[]>> {
    return this.http.post<ResponseT<PurchasePolicyTypeWrapper[]>>(
      this.serverUrl + '/removePurchasePolicyFromShop',
      request,
      httpOptions
    );
  }
  getPurchasePoliciesOfShop(request: GetPoliciesRequest): Observable<ResponseT<PurchasePolicyTypeWrapper[]>> {
    return this.http.post<ResponseT<PurchasePolicyTypeWrapper[]>>(
      this.serverUrl + '/getPurchasePoliciesOfShop',
      request,
      httpOptions
    );
  }
  getDiscountTypesOfShop(request: GetPoliciesRequest): Observable<ResponseT<DiscountTypeWrapper[]>> {
    return this.http.post<ResponseT<DiscountTypeWrapper[]>>(
      this.serverUrl + '/getDiscountTypesOfShop',
      request,
      httpOptions
    );
  }
  isServerInit(): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/isServerInit',
      httpOptions
    );
  }

  reOpenClosedShop(
    request: TwoStringRequest
  ): Observable<Response> {
    return this.  http.post<Response>(
      this.serverUrl + '/reOpenClosedShop',
      request,
      httpOptions
    );
  }
  isSystemManager(
    request: IsSystemManagerRequest
  ): Observable<Response> {
    return this.  http.post<ResponseT<boolean>>(
      this.serverUrl + '/isSystemManager',
      request,
      httpOptions
    );
  }




  removeShopOwnerAppointment(
    request: RemoveAppointmentRequest
  ): Observable<Response> {
    return this.http.post<Response>(
      this.serverUrl + '/removeShopOwnerAppointment',
      request,
      httpOptions
    );
  }
  // removeMember(
  //   request: removeMember
  // ): Observable<ResponseT<string>> {
  //   return this.http.post<ResponseT<string>>(
  //     this.serverUrl + '/removeMember',
  //     request,
  //     httpOptions
  //   );
  // }
}
