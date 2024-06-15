// ignore_for_file: file_names, avoid_print, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:city_construction_app/PaymentPage.dart';

class ProjectViews extends StatefulWidget {
  final int projectId;
  const ProjectViews({Key? key, required this.projectId}) : super(key: key);

  @override
  State<ProjectViews> createState() => _ProjectViewsState();
}

class _ProjectViewsState extends State<ProjectViews> {
  List<dynamic> projectNames = [];
  bool isLoading = true;
  Map<String, dynamic> clientDetails = {};
  Map<String, dynamic> designDetails = {};
  double totalAmountPaid = 0.0;

  @override
  void initState() {
    super.initState();
    fetchProjectNames();
  }

  Future<void> fetchInvoices(String projectNo) async {
    print(projectNo);
    print("fetching Invoice Amount");
    var url =
        'http://10.0.2.2:8000/invoice_reciept/get_invoices_by_ProjectNO/?prNo=$projectNo';
    final response = await http.get(Uri.parse(url));
    print(response.statusCode);
    print("response");
    if (response.statusCode == 200) {
      final List<dynamic> invoices = json.decode(response.body);
      double amountPaid = 0.0;
      print(response.body);
      print("Invoice : $invoices");
      for (var invoice in invoices) {
        print(invoice['amount']);
        amountPaid += double.tryParse(invoice['amount']) ?? 0.0;
        print("Anmount Paid : $amountPaid"); // Adjust this key if necessary
      }
      setState(() {
        totalAmountPaid = amountPaid;
      });
    } else {
      print('Failed to fetch invoices');
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
        isLoading = false;
      });
      print("Project Names: $projectNames");
      print(projectNames[0]['design']);
      print(projectNames[0]['client']);
      fetchDesignImage(projectNames[0]['design']);
      fetchClientName(projectNames[0]['client']);
      fetchInvoices(projectNames[0]['project_No']); // Fetch invoices here
    } else {
      setState(() {
        isLoading = false;
      });
      print('Failed to fetch project names');
    }
  }

  Future<void> fetchClientName(int clientId) async {
    print("Client Id : $clientId");
    var clientUrl = 'http://10.0.2.2:8000/Client/view/$clientId';
    var clientResponse = await http.get(
      Uri.parse(clientUrl),
    );
    print(clientResponse.statusCode);
    if (clientResponse.statusCode == 200) {
      var client = jsonDecode(clientResponse.body);
      setState(() {
        clientDetails = client;
        print(clientDetails);
      });
    } else {
      print('Failed to fetch client Name');
    }
  }

  Future<void> fetchDesignImage(int designId) async {
    print("Design Id : $designId");
    var designUrl = 'http://10.0.2.2:8000/Design/view/$designId';
    var designRes = await http.get(
      Uri.parse(designUrl),
    );
    print(designRes.statusCode);
    if (designRes.statusCode == 200) {
      var design = jsonDecode(designRes.body);
      setState(() {
        designDetails = design;
        print("design Details : $designDetails");
      });
    } else {
      print('Failed to fetch design image');
    }
  }

  @override
  Widget build(BuildContext context) {
    var clientName =
        clientDetails.isNotEmpty ? clientDetails['client_name'] : '';
    var clientID = clientDetails.isNotEmpty ? clientDetails['id'] : '';
    var designImage =
        designDetails.isNotEmpty ? designDetails['architecture'] : '';
    print("ClientName : $clientName");
    print("Image DESIGN : $designImage");
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Project View',
          style: TextStyle(
            color: Colors.blue[900],
          ),
        ),
        leading: BackButton(
          color: Colors.blue[900],
        ),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: projectNames.length,
              itemBuilder: (context, index) {
                final data = projectNames[index];
                final startDate = data['start_date'] != null
                    ? DateFormat('MMMM d, yyyy')
                        .format(DateTime.parse(data['start_date']))
                    : 'N/A';
                final endDate = data['end_date'] != null
                    ? DateFormat('MMMM d, yyyy')
                        .format(DateTime.parse(data['end_date']))
                    : 'N/A';

                return Card(
                  elevation: 5,
                  margin: EdgeInsets.all(16),
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              width: 150,
                              height: 60,
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  image: NetworkImage(
                                      'https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Frontend/react-admin-dashboard-master/react-admin-dashboard-master/public/assets/employee/city logo.png'),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            SizedBox(
                              width: 100,
                              height: 60,
                              child: TextButton.icon(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => PaymentPage(
                                          clientsId: clientID,
                                          projectId: widget.projectId),
                                    ),
                                  );
                                },
                                icon: Icon(
                                  Icons.currency_exchange,
                                  color: Colors.blue[900],
                                  size: 10,
                                ),
                                label: Text(
                                  'Pay Now',
                                  style: TextStyle(
                                    color: Colors.blue[900],
                                    fontWeight: FontWeight.bold,
                                    fontSize: 10,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 20),
                        Container(
                          decoration: BoxDecoration(
                            border: Border.all(color: Color(0xFF6FD7BC)),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          padding: EdgeInsets.all(16),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                children: [
                                  Text(
                                    '\$$totalAmountPaid',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    'Amount Paid',
                                    style: TextStyle(
                                      fontSize: 16,
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Text(
                                    '\$${data['BudgetRemain']?.toString() ?? 'N/A'}',
                                    style: TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    'Remain',
                                    style: TextStyle(
                                      fontSize: 16,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        SizedBox(height: 20),
                        data['image'] != null
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: Image.file(
                                  File(data['image']),
                                  width: double.infinity,
                                  height: 200,
                                  fit: BoxFit.cover,
                                ),
                              )
                            : ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: Image.network(
                                  "https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Frontend/react-admin-dashboard-master/react-admin-dashboard-master/public/assets/design/$designImage",
                                  width: double.infinity,
                                  height: 200,
                                  fit: BoxFit.cover,
                                ),
                              ),
                        SizedBox(height: 16),
                        Text(
                          'Client Name: $clientName',
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 8),
                        Text('Project Name: ${data['project_name'] ?? 'N/A'}'),
                        SizedBox(height: 8),
                        Text('Start Date: $startDate'),
                        SizedBox(height: 8),
                        Text('End Date: $endDate'),
                        SizedBox(height: 8),
                        Text(
                            'Budget: \$${data['budget']?.toString() ?? 'N/A'}'),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}