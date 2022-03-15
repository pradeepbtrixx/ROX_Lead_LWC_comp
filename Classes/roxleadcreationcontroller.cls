/*
* @File Name          : roxleadcreationcontroller.cls
* @Description        : 
* @Author             : Pradeep Kumar
* @Last Modified By   : pradeepkumarbabu@rudhrainfosolutions.com
* @Last Modified On   : 14/03/2022
* @Modification Log   : 
*==============================================================================
* Ver         Date                     Author      		      Modification
*==============================================================================
* 1.0    14/03/2022                 Pradeep Kumar          Initial Version
*/
public inherited sharing class roxleadcreationcontroller {
    @AuraEnabled(cacheable=true)
    public static Account getAccount(Id selectedaccId){
        Account acc = [SELECT Id, Name, Industry, Fax, Website, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry FROM Account WHERE Id =: selectedaccId];
        return acc;
    }
}