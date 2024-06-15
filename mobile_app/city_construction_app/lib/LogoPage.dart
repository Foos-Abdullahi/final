// ignore_for_file: use_key_in_widget_constructors, file_names

import 'package:flutter/material.dart';

class LogoPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.blue[900],
        child: Center(
          child: Image.asset(
            'images/logo.png',
            width: 200,
            height: 200,
          ),
        ),
      ),
    );
  }
}
