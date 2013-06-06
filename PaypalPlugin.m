//
//  PayPalPlugin.m
//  paypalplugin
//
//  Created by Scott Robinson on 6/5/13.
//
//

#import "PayPalPlugin.h"

@implementation PayPalPlugin

- (IBAction)pay {
    
    //Create a PayPalPayment
    PayPalPayment *p = [[PayPalPayment alloc] init];
    p.amount = [[NSDecimalNumber alloc] initWithString:@"39.95"];
    p.currencyCode = @"USD";
    p.shortDescription = @"Awesome saws";
    
    //Check wether payment is processable
    if (!p.processable) {
        //TODO: Need to handle this
    }
    
    // Start out working with the test environment! When you are ready, remove this line
    [PayPalPaymentViewController setEnvironment:PayPalEnvironmentNoNetwork];
    
    //Prove a payerID that uniquely identifies a user within the scope of your system,
    // such as an email address or user ID
    NSString *aPayerID = @"someuser@somedomain.com";
    
    // Create a PayPalPaymentViewController with the credentuals and payerID, the PayPalPayment
    // from the previous step, and a PayPalPaymentDelegate to handle the results.
    PayPalPaymentViewController *paymentViewController;
    paymentViewController = [[PayPalPaymentViewController alloc] initWithClientId:@"YOUR_CLIENT_ID" recieverEmail:@"YOUR_PAYPAL_EMAIL_ADDRESS" payerId:aPayerID payment:p delegate:self];
    
    //Present the PayPalPaymentViewController
    [self presentViewController:paymentViewController animated:YES completion:nil];
}
    #pragma mark - PayPalPaymentDelegate methods
    
- (void)payPalPaymentDidComplete:(PayPalPayment *)completedPayment {
    //Payment was processed successfully; send to server for verification and fulfillment.
    [self veryifyCompletedPayment:completedPayment];
    
    //Dissmiss the PayPalPaymentViewController.
    [self dismissViewControllerAnimated:YES completiton:nil];
}
    
- (void)payPalPaymentDidCancel {
    //The payment was canceled; dismiss the PauPalPaymentViewController.
    [self dismissViewControllerAnimated:YES completion:nil];
}
    
- (void)veryifyCompletedPayment:(PayPalPayment *)completedPayment {
    //Send the enrite confirmation dictionary
    NSData *confirmation = [NSJSONSerialization dataWithJSONObject:completedPayment.confirmation options:0 error:nil];
        
    // Send confirmation to your server; your server should verify the proof of payment
    // and give the user their goods or services. If the server is not reachable, save
    // the confirmation and try again later.
}
       
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
            
    //Start out working with the test envirnment! When you are ready remove this line.
    [PayPalPaymentViewController setEnvironment:PayPalEnvironmentNoNetwork];
    [PayPalPaymentViewController prepareForPaymentUsingClientId:@"YOUR_CLIENT_ID"];
}

@end
