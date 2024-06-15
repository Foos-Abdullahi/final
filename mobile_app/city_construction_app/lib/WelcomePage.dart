// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors, avoid_unnecessary_containers, file_names
import 'package:city_construction_app/SignInPage.dart';
import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor:Color(0xFF6FD7BC).withOpacity(0.3),),
      body: SafeArea(
        child: Container(
          color: Color(0xFF6FD7BC).withOpacity(0.3),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                 Center(
                  child: Image.asset(
                    'images/logo.png',
                    height: 100,
                  ),
                ),
                SizedBox(height: 18),
                Center(
                  child: Image.asset(
                    'images/eng.png',
                    height: 200,
                  ),
                ),
                SizedBox(height: 0),
                Center(
                  child: Text(
                    'Welcome !',
                    style: TextStyle(
                      color: Color(0xFF6FD7BC),
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                SizedBox(height: 16),
                Center(
                  child: Text(
                    'Best place That Can Build your Dream house',
                    style: TextStyle(fontSize: 14),
                  ),
                ),
                SizedBox(height: 80),
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
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
                          backgroundColor: Color.fromARGB(255, 47, 181, 146),
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}
