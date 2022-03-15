/*
* @File Name          : roxleadcreationcontrollertest.cls
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
@isTest
public class roxleadcreationcontrollertest {
    static testmethod void getFieldInfoTest(){
        Account testAccount = new Account();
        testAccount.Name = 'Test Account';
        insert testAccount;
    	Account result = roxleadcreationcontroller.getAccount(testAccount.Id);
        system.assertEquals(result.Name, 'Test Account');
    }
    
    static testmethod void getFieldInfoTest2(){
        Account testAccount = new Account();
        testAccount.Name = 'Test Account2';
        insert testAccount;
    	Account result = roxleadcreationcontroller.getAccount(testAccount.Id);
        system.assertEquals(result.Name, 'Test Account2');
    }

}