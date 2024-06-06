import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'SignInPage.dart';

class ForgotPassword extends StatefulWidget {
  final int clientId;
  ForgotPassword({Key? key, required this.clientId}) : super(key: key);

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  final txtPassword = TextEditingController();
  final txtClientId = TextEditingController();

  String? clientName;
  String? email;
  String? phone;
  String? issueDate;
  int? user;
  String? clientImage;
  String? documentImage;

  @override
  void initState() {
    super.initState();
    txtClientId.text = widget.clientId.toString();
    fetchClientData();
  }

  Future<void> fetchClientData() async {
    try {
      var response = await http.get(
        Uri.parse('http://10.0.2.2:8000/Client/view/${widget.clientId}/'),
      );

      if (response.statusCode == 200) {
        dynamic client = jsonDecode(response.body);

        setState(() {
          clientName = client['client_name'];
          email = client['email'];
          phone = client['phone'];
          issueDate = client['issue_date'];
          user = client['user'];
          clientImage = client['client_image'];
          documentImage = client['document_image'];
        });
      } else {
        _showErrorDialog("Failed to fetch client data. Please try again.");
      }
    } catch (e) {
      _showErrorDialog("Error connecting to the server: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        margin: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _header(),
            _inputField(),
          ],
        ),
      ),
    );
  }

  Widget _header() {
    return Column(
      children: [
        Text(
          "Forgot Password",
          style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
        ),
        Text("City Construction Management System"),
      ],
    );
  }

  Widget _inputField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // TextField(
        //   controller: txtClientId,
        //   readOnly: true,
        //   decoration: InputDecoration(
        //     hintText: "Client ID",
        //     border: OutlineInputBorder(
        //       borderRadius: BorderRadius.circular(18),
        //       borderSide: BorderSide.none,
        //     ),
        //     fillColor: Color(0xFF6FD7BC).withOpacity(0.1),
        //     filled: true,
        //     prefixIcon: Icon(Icons.person),
        //   ),
        // ),
        // SizedBox(height: 16),
        TextField(
          controller: txtPassword,
          decoration: InputDecoration(
            hintText: "New Password",
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(18),
              borderSide: BorderSide.none,
            ),
            fillColor: Color(0xFF6FD7BC).withOpacity(0.1),
            filled: true,
            prefixIcon: Icon(Icons.password),
          ),
          obscureText: true,
        ),
        SizedBox(height: 30),
        ElevatedButton(
          onPressed: () {
            var clientId = int.parse(txtClientId.text);
            var password = txtPassword.text;

            // Unfocus the text fields to hide the keyboard
            FocusScope.of(context).unfocus();

            forgotClientPassword(clientId, password);
          },
          style: ElevatedButton.styleFrom(
            shape: StadiumBorder(),
            padding: EdgeInsets.symmetric(vertical: 16),
            backgroundColor: Color(0xFF6FD7BC),
          ),
          child: Text(
            "Save New Password",
            style: TextStyle(color: Colors.black, fontSize: 20),
          ),
        )
      ],
    );
  }

  Future<void> forgotClientPassword(int clientId, String pass) async {
    try {
      var url = Uri.parse('http://10.0.2.2:8000/Client/update/$clientId/');

      var requestBody = {
        'id': clientId.toString(),
        'client_name': clientName ?? '',
        'password': pass,
        'email': email ?? '',
        'phone': phone ?? '',
        'issue_date': issueDate ?? '',
        'user': user?.toString() ?? '',
        // If the image fields are null, don't include them in the request
        if (clientImage != null) 'client_image': clientImage,
        if (documentImage != null) 'document_image': documentImage,
      };

      var response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        print("Password updated successfully!");

        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => SignInPage()),
          (route) => false,
        );
      } else {
        print("Failed to update password. Status code: ${response.statusCode}");
        print("Response body: ${response.body}");
        _showErrorDialog("Failed to update password. Please try again.");
      }
    } catch (e) {
      print("Error: $e");
      _showErrorDialog("Error connecting to the server: $e");
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Error'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }
}
