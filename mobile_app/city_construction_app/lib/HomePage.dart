// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors

import 'package:city_construction_app/SignInPage.dart';
import 'package:flutter/material.dart';
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              width: screenWidth - 1,
              height: screenWidth - -100,
              decoration: BoxDecoration(
                color: Colors.blue[900],
                borderRadius: BorderRadius.only(
                  bottomRight: Radius.circular(100.0),
                ),
                border: Border.all(
                  color: Colors.blue[900]!,
                  width: 3.0,
                ),
                image: DecorationImage(
                  image: AssetImage('images/6.jpg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(height: 30),
            Text(
              'Welcome To City Construction App!',
              style: TextStyle(
                color: Colors.blue[900],
                fontSize: 24.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            Center(
              child: Text(
                'Best place That Can Build your Dream house',
                style: TextStyle(fontSize: 14,
                // color: Color(0xFF6FD7BC),
                ),
              ),
            ),
            SizedBox(height: 16),
             ElevatedButton(
                    onPressed: () {
                        Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) {
                    return SignInPage();
                  }),
                );
                    },
                    style: ElevatedButton.styleFrom(
                      primary: Color.fromARGB(255, 47, 181, 146),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      padding:
                          EdgeInsets.symmetric(vertical: 12, horizontal: 70),
                    ),
                    child: Text(
                      'SIGN IN',
                      style: TextStyle(color: Colors.white, fontSize: 20),
                    ),
                  ),
                  SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}