//
//  ViewController.m
//  CarGame
//
//  Created by Seng Hin Mak on 31/3/15.
//  Copyright (c) 2015 Makzan. All rights reserved.
//

#import "ViewController.h"

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // Do any additional setup after loading the view.
    
    NSURL *url = [NSURL URLWithString:@"http://makzan.net/html5-games/car-game/"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [[self.gameWebView mainFrame] loadRequest:request];
}

- (void)setRepresentedObject:(id)representedObject {
    [super setRepresentedObject:representedObject];

    // Update the view, if already loaded.
}

@end
