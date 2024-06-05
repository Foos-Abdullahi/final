// ignore_for_file: avoid_print, non_constant_identifier_names, file_names, prefer_const_constructors, prefer_const_literals_to_create_immutables, deprecated_member_use, unnecessary_string_interpolations, use_build_context_synchronously

import 'dart:convert';

// import 'package:city_construction_app/PaymentDetail.dart';
import 'package:city_construction_app/ProjectViewPage.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class PaymentPage extends StatefulWidget {
  final int clientsId;
  final int projectId;
  const PaymentPage(
      {Key? key, required this.clientsId, required this.projectId})
      : super(key: key);

  @override
  State<PaymentPage> createState() => _PaymentPageState();
}

class _PaymentPageState extends State<PaymentPage> {
  String? selectedProject;
  String? selectedProjectName;
  List<dynamic> projectNames = [];
  String? selectedPaymentMethod;
  List<dynamic> paymentMethods = [];
  String? clientName;
  String? payId;
  String? projectName;
  double? amount;
  TextEditingController projectController = TextEditingController();
  TextEditingController amountController = TextEditingController();

  // final GlobalKey<ScaffoldMessengerState> _scaffoldMessengerKey =
  //     GlobalKey<ScaffoldMessengerState>();

  @override
  void initState() {
    super.initState();
    fetchProjectNames();
    fetchClient();
    fetchPaymentMethod();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(
          color: Color.fromARGB(255, 47, 181, 146),
        ),
        title: Text(
          'Payment',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Color.fromARGB(255, 47, 181, 146),
          ),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Container(
                  height: 100,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Color(0xFF6FD7BC),
                        const Color.fromARGB(255, 13, 71, 161)
                      ],
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.all(16.0),
                  child: Center(
                    child: Text(
                      'Payment Page',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 16),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        Text(
                          '$clientName',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 16),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: <Widget>[
                        TextFormField(
                          controller: projectController,
                          keyboardType: TextInputType.number,
                          readOnly: true,
                          decoration: InputDecoration(
                            labelText: 'Project Name',
                          ),
                          onChanged: (value) {
                            amount = double.tryParse(value);
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 16),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: <Widget>[
                        DropdownButtonFormField<String>(
                          value: selectedPaymentMethod,
                          onChanged: (value) {
                            setState(() {
                              selectedPaymentMethod = value;
                            });
                          },
                          items: paymentMethods
                              .map<DropdownMenuItem<String>>((method) {
                            return DropdownMenuItem<String>(
                              value: method['Py_method_name'],
                              child: Text(method['Py_method_name']),
                            );
                          }).toList(),
                          decoration: InputDecoration(
                            labelText: 'Payment Method',
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 16),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: <Widget>[
                        TextFormField(
                          controller: amountController,
                          keyboardType: TextInputType.number,
                          decoration: InputDecoration(
                            labelText: '\$ Amount',
                          ),
                          onChanged: (value) {
                            amount = double.tryParse(value);
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    AddInvoiceReciept();
                  },
                  style: ElevatedButton.styleFrom(
                    primary: Color.fromARGB(255, 47, 181, 146),
                  ),
                  child: Text('Submit'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> AddInvoiceReciept() async {
    // if (selectedProjectName == null || selectedProject == null) {
    //   _scaffoldMessengerKey.currentState?.showSnackBar(
    //     SnackBar(
    //       content: Text("Please select project name."),
    //     ),
    //   );
    //   print("Please select project name.");
    //   return;
    // }
    if (amountController.text.isEmpty || selectedPaymentMethod == null) {
      // Show a snackbar if amount is empty
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Please enter the amount.'),
        ),
      );
      return;
    }
    final url = Uri.parse('http://10.0.2.2:8000/invoice_reciept/addNew/');
    var pId = paymentMethods[0]['id'];
    print("PID $pId");
    var data = {
      "payment_method": pId!,
      "client": widget.clientsId,
      "project": widget.projectId,
      "amount": amountController.text,
      "issue_date": "2024-05-26",
      "name": clientName,
      "registration_type": "client"
    };

    print("data : $data");
    var res = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode(data),
    );
    var response = res.body;

    print("data :  $data");

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(response),
      ),
    );
    print("Response : $response");
    // print("Select project : $selectedProject");
    print("Select pay method : $selectedPaymentMethod");
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ProjectViews(projectId: widget.projectId)
        ),
    );
  }

  Future<void> fetchClient() async {
    print("Client View");
    print(widget.clientsId);
    var url = 'http://10.0.2.2:8000/Client/view/${widget.clientsId}';
    final response = await http.get(
      Uri.parse(url),
    );
    if (response.statusCode == 200) {
      setState(() {
        var clientData = json.decode(response.body);
        print(clientData['client_name']);
        clientName = clientData['client_name'];
      });
    } else {
      print('Failed to fetch client information');
    }
  }

  Future<void> fetchProjectNames() async {
    print("Fetching project names...");
    var url = 'http://10.0.2.2:8000/Projects/view/${widget.projectId}';

    final response = await http.get(Uri.parse(url));
    print(response.statusCode);
    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      setState(() {
        print(response.body);
        projectNames = [responseData];
        projectController.text = projectNames[0]['project_name'];
        print("projectController : $projectController");
      });
      print("Project Names: $projectNames");
    } else {
      print('Failed to fetch project names');
    }
  }

  Future<void> fetchPaymentMethod() async {
    print("Fetching fetch payment Methods...");
    var url = 'http://10.0.2.2:8000/Payment_Methode/';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      setState(() {
        var payMethods = json.decode(response.body);
        paymentMethods = payMethods;
        print("paymentMethods : $paymentMethods");
        print("payMethods : $payMethods");
        payId = paymentMethods[0]['id'].toString();
        print("payId : $payId");
      });
      // print("paymentMethods: $paymentMethods");
    } else {
      print('Failed to fetch paymentMethods');
    }
  }
}
