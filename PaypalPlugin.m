//
//  PayPalPlugin.m
//  paypalplugin
//
//  Created by Scott Robinson on 6/5/13.
//
//

#import "PayPalPlugin.h"

@implementation PayPalPlugin

@synthesize payment,
            viewController,
            customerEMail,
            customerPhoneCountryCode,
            customerPhoneNumber,
            payerID,
            clientID;

//*********//
//**Setup**//
//*********//

//Required
- (void)setRequired:(CDVInvokedUrlCommand *)command
{
    //Arguments
    NSString * environment = [command.arguments objectAtIndex:0];
    NSString * clientId = [command.arguments objectAtIndex:1];
    NSString * clientEMail = [command.arguments objectAtIndex:2];
    NSDecimalNumber * amount = [command.arguments objectAtIndex:3];
    NSString * currencyCode = [command.arguments objectAtIndex:4];
    NSString * shortDescription = [command.arguments objectAtIndex:5];
    
    //Create payment object
    payment = [[[PayPalPayment alloc] init] autorelease];
    
    //Set payment information
    payment.amount = amount;
    payment.currencyCode = currencyCode;
    payment.shortDescription = shortDescription;
    
    NSLog(@"Arguments: %@, %@, %@, %@, %@, %@", environment, clientId, clientEMail, amount, currencyCode, shortDescription);
    
    //Create PayPalViewController
    viewController = [[[PayPalPaymentViewController alloc] initWithClientId:clientId
                                                              receiverEmail:clientEMail
                                                                    payerId:self.payerID
                                                                    payment:self.payment
                                                                   delegate:self] autorelease];
    
    //Set environment
    if ([environment isEqual:@"NoNetwork"]) [PayPalPaymentViewController setEnvironment:PayPalEnvironmentNoNetwork];
    else if ([environment isEqual:@"Sandbox"]) [PayPalPaymentViewController setEnvironment:PayPalEnvironmentSandbox];
    else [PayPalPaymentViewController setEnvironment:PayPalEnvironmentProduction];
    
    //Keep needed variables
    self.clientID = clientId;
}

//Optional
- (void)setOptionalDefaults:(CDVInvokedUrlCommand *)command
{
    //Arguments
    NSString * payerEmail = [command.arguments objectAtIndex:0];
    NSString * payerPhoneCountryCode = [command.arguments objectAtIndex:1];
    NSString * payerPhone = [command.arguments objectAtIndex:2];
    
    viewController.defaultUserEmail = payerEmail;
    viewController.defaultUserPhoneCountryCode = payerPhoneCountryCode;
    viewController.defaultUserPhoneNumber = payerPhone;
}

//Optional
- (void)setOptionalPayerID:(CDVInvokedUrlCommand *)command
{
    //Arguments
    NSString * payerId = [command.arguments objectAtIndex:0];
    
    NSLog(@"Payer ID: %@", payerId);
    
    self.payerID = payerId;
}

//Optional
- (void)prepareForPayment:(CDVInvokedUrlCommand *)command
{
    [PayPalPaymentViewController prepareForPaymentUsingClientId:self.clientID];
}

//Optional
- (void)preconnectToServer:(CDVInvokedUrlCommand *)command
{
    [PayPalPaymentViewController prepareForPaymentUsingClientId:self.clientID];
}

//************************//
//** Payment Processing **//
//************************//

//Required
- (void)pay:(CDVInvokedUrlCommand *)command
{
    if(!payment.processable) {
        NSLog(@"Payment is not processable");
        [super writeJavascript:@"PayPalPlugin.NotProcessable();"];
    } else {
        [viewController presentViewController:viewController
                                     animated:YES
                                   completion:nil];
    }
}

//Required
- (void)payPalPaymentDidComplete:(PayPalPayment *)completedPayment
{
    [viewController dismissViewControllerAnimated:YES
                                       completion:nil];
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:completedPayment.confirmation
                                                       options:NSJSONWritingPrettyPrinted
                                                         error:&error];
    if (!jsonData) {
        NSLog(@"JSON Serialization Error %@", error);
    } else {
        NSString *jsonString = [[[NSString alloc] initWithData:jsonData
                                                      encoding:NSUTF8StringEncoding] autorelease];
        NSString *javascriptString = [[[NSString alloc] initWithFormat:@"PayPalPlugin.PaymentCompleted(%@);", jsonString] autorelease];
        [super writeJavascript:javascriptString];
    }
}

//Required
- (void)payPalPaymentDidCancel
{
    [viewController dismissViewControllerAnimated:YES
                                       completion:nil];
    [super writeJavascript:@"PayPalPlugin.PaymentCanceled();"];
}

@end
