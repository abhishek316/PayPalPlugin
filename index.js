/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', function () {
                                  app.InitPage();
                                  }, false);
    },
    InitPage: function() {
        $('#page').append(
                          $('<button/>').html("Set Payer ID").on('click', function () {PayPalPlugin.setOptionalPayerID(null, null, "1234");}),
                          $('<button/>').html("Set Required").on('click', function () {PayPalPlugin.setRequired(null, null, "NoNetwork", "9823508", "snare_c@yahoo.com", 25.07, "USD", "This is a description");}),
                          $('<button/>').html("Prepare For Payment").on('click', function () {PayPalPlugin.prepareForPayment(null,null);}),
                          $('<button/>').html("Set Defaults").on('click', function () {PayPalPlugin.setOptionalDefaults(null, null, "snare_chops@yahoo.com", "+1", "9192158536");}),
                          $('<button/>').html("Preconnect to Server").on('click', function () {PayPalPlugin.preconnectToServer(null, null);}),
                          $('<button/>').html("Pay").on('click', function () {PayPalPlugin.pay(null, null);})
                          );
    }
};
