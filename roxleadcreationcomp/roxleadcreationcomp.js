/*
* @File Name          : roxleadcreationcomp.js
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
import { LightningElement} from 'lwc';
import ROX_LEAD from "@salesforce/schema/ROX_Lead__c";
import getAccount from '@salesforce/apex/roxleadcreationcontroller.getAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class Roxleadcreationcomp extends LightningElement {

    objApi = ROX_LEAD;
    recordtypeid;

    accdescription;
    acctitle;
    accrating;
    accannualrev;
    accLeadsource;
    accLeadstatus;
    accphone;
    accmobile;
    accemail;
    accleadname;
    accname;
    accfax;
    accwebsite;
    accindustry;
    accstreet;
    acccity;
    accstate;
    acczip;
    acccountry;
    exischeck;
    exisaccid;

    
    value = '';

    get options() {
        return [
            { label: 'Direct', value: 'Directval' },
            { label: 'Indirect', value: 'inDirectval' },
        ];
    }

    ee = false;
    home = true;

    recordtypeassigner(event){
        if(event.detail.value == "Directval"){
            this.recordtypeid = "0129D000001AgykQAC";
            this.home = false;
            this.ee = true;
            
        }
        else if(event.detail.value == "inDirectval"){
            this.recordtypeid = "0129D000001AgypQAC";
            this.home = false;
            this.ee = true;
            
        }
    }
    
    handleAccountSelection(event){
        let selectedAccount = event.target.value;
        if(selectedAccount){
            this.exisaccid = selectedAccount;
            this.exischeck = true;
            getAccount({ selectedaccId: selectedAccount })
            .then(result => {
                result.Name ? this.accname = result.Name : this.accname = " ";
                result.Fax ? this.accfax = result.Fax : this.accfax = null;
                result.Website ? this.accwebsite = result.Website : this.accwebsite = " ";
                result.Industry ? this.accindustry = result.Industry : this.accindustry = " ";
                result.BillingStreet ? this.accstreet = result.BillingStreet : this.accstreet = " ";
                result.BillingCity ? this.acccity = result.BillingCity : this.acccity = " ";
                result.BillingState ? this.accstate = result.BillingState : this.accstate = " ";
                result.BillingPostalCode ? this.acczip = result.BillingPostalCode : this.acczip = " ";
                result.BillingCountry ? this.acccountry = result.BillingCountry : this.acccountry = " ";
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
            })
        }
        else{
            this.accname = " ";
            this.accfax = null;
            this.accwebsite = " ";
            this.accindustry = " ";
            this.accstreet = " ";
            this.acccity = " ";
            this.accstate = " ";
            this.acczip = " ";
            this.acccountry = " ";
            this.error = undefined;
            this.exischeck = false;
            this.exisaccid = " ";
        }
        
    }

    handleCancel(event){
        window.history.back();
        return false;
    }
    
    saveAndNew = false;

    handleSave() {
        this.saveAndNew = false;
        this.handleRecordSave();
    }

    handleSaveAndNew() {
        this.saveAndNew = true;
        this.handleRecordSave();
    }

    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
            field.reset();
            });
        }
    }

    handleSuccess() {
    if(this.saveAndNew){
        this.handleReset();
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Lead record has been created',
                variant: 'success',
            }),
        );
    } else{
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Lead record has been created',
                variant: 'success',
            }),
        );
        setTimeout(
            function() {
                window.history.back();
            },
            10
        );
    }
    }

    fields;
    newleadrecordid;

    handleRecordSave(event) {
        event.preventDefault(); 
        this.fields = event.detail.fields;
        this.newleadrecordid = event.detail.id;
        this.template.querySelector('lightning-record-edit-form').submit(this.fields);
    }


}