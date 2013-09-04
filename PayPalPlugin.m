/*****************************************
 *  PayPalPlugin.m
 *
 *  Created by Scott Robinson on 6/5/13.
 *
 *  Version: 2.0b
 *****************************************
 * Implementation Note: DO NOT MODIFY THIS FILE
 *****************************************/

#import "PayPalPlugin.h"

@implementation PayPalPlugin

- (void)preconnect:(CDVInvokedUrlCommand *)command
{
    NSString * environment = [command.arguments objectAtIndex:0];
    
    NSDictionary *dict = [NSDictionary dictionaryWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"Info" ofType:@".plist"]];
    
    NSString *ClientID = [dict objectForKey:@"ClientID"];
    
    if([environment isEqual:@"NoNetwork"])
    {
        NSLog(@"Using NoNetwork");
        [PayPalPaymentViewController setEnvironment:PayPalEnvironmentNoNetwork];
    }
    else if([environment isEqual:@"Sandbox"])
    {
        NSLog(@"Using Sandbox");
        [PayPalPaymentViewController setEnvironment:PayPalEnvironmentSandbox];
    }
    else [PayPalPaymentViewController setEnvironment:PayPalEnvironmentProduction];
    
    [PayPalPaymentViewController prepareForPaymentUsingClientId:ClientID];
}

- (void)makePayment:(CDVInvokedUrlCommand *)command
{
    NSString * environment = [command.arguments objectAtIndex:0];
    NSDecimalNumber * amount = [command.arguments objectAtIndex:1];
    NSString * currencyCode = [command.arguments objectAtIndex:2];
    NSString * shortDescription = [command.arguments objectAtIndex:3];
    NSString * payerId = [command.arguments objectAtIndex:4];
    NSString * payerEmail = [command.arguments objectAtIndex:5];
    NSString * payerPhoneCountryCode = [command.arguments objectAtIndex:6];
    NSString * payerPhone = [command.arguments objectAtIndex:7];
    
    PayPalPayment * payment = [[PayPalPayment alloc] init];
    
    //Set payment information
    payment.amount = amount;
    payment.currencyCode = currencyCode;
    payment.shortDescription = shortDescription;
    
    NSLog(@"Settings: %@, %@, %@, %@, %@, %@, %@, %@", environment, amount, currencyCode, shortDescription, payerId, payerEmail, payerPhoneCountryCode, payerPhone);
    
    NSDictionary *dict = [NSDictionary dictionaryWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"Info" ofType:@".plist"]];
    
    NSString *ClientID = [dict objectForKey:@"ClientID"];
    NSString *ClientEMail = [dict objectForKey:@"ClientEMail"];
    
    NSLog(@"Client Information: %@, %@", ClientID, ClientEMail);
    
    //Create PayPalViewController
    PayPalPaymentViewController * paymentViewController = [[PayPalPaymentViewController alloc] initWithClientId:ClientID
                                                                                                  receiverEmail:ClientEMail
                                                                                                        payerId:payerId
                                                                                                        payment:payment
                                                                                                       delegate:self];
    
    //Set environment
    if ([environment isEqual:@"NoNetwork"]) [PayPalPaymentViewController setEnvironment:PayPalEnvironmentNoNetwork];
    else if ([environment isEqual:@"Sandbox"]) [PayPalPaymentViewController setEnvironment:PayPalEnvironmentSandbox];
    else [PayPalPaymentViewController setEnvironment:PayPalEnvironmentProduction];
    
    paymentViewController.defaultUserEmail = payerEmail;
    paymentViewController.defaultUserPhoneCountryCode = payerPhoneCountryCode;
    paymentViewController.defaultUserPhoneNumber = payerPhone;
    
    if(!payment.processable) {
        NSLog(@"Payment is not processable");
        [super writeJavascript:@"PayPalPlugin.NotProcessable();"];
    } else {
        NSLog(@"Payment is processable. Showing viewController");
        [self.viewController presentViewController:paymentViewController
                                          animated:YES
                                        completion:nil];
    }
}

-(void)payPalPaymentDidComplete:(PayPalPayment *)completedPayment
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:completedPayment.confirmation options:NSJSONWritingPrettyPrinted error:&error];
    NSString *javascriptString;
    
    if(!jsonData) {
        NSLog(@"JSON Serialization Error: %@", error);
    } else {
        NSString * jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        javascriptString = [[NSString  alloc] initWithFormat:@"PayPalPlugin.payPalPaymentDidComplete(%@);", jsonString];
    }
    
    [super writeJavascript:javascriptString];
    
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

- (void)payPalPaymentDidCancel
{
    [self writeJavascript:@"PayPalPlugin.payPalPaymentDidCancel();"];
    
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

@end
