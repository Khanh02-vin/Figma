import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/form_input.dart';
import '../widgets/primary_button.dart';

class ForgotPasswordScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onSendOTP;

  const ForgotPasswordScreen({
    super.key,
    required this.onBack,
    required this.onSendOTP,
  });

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  String _email = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  IconButton(
                    onPressed: widget.onBack,
                    icon: const Icon(Icons.arrow_back, size: 28),
                  ),
                ],
              ),
            ),
            // Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Forgot Your Password? 🔑',
                      style: TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        color: AppColors.foreground,
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      "We've got you covered. Enter your registered email to reset your password. We will send an OTP code to your email for the next steps.",
                      style: TextStyle(fontSize: 14, color: AppColors.mutedForeground, height: 1.5),
                    ),
                    const SizedBox(height: 32),
                    FormInput(
                      label: 'Your Registered Email',
                      hint: 'Email',
                      value: _email,
                      onChanged: (v) => setState(() => _email = v),
                      icon: Icons.email_outlined,
                      keyboardType: TextInputType.emailAddress,
                    ),
                  ],
                ),
              ),
            ),
            // Footer
            Padding(
              padding: const EdgeInsets.all(24),
              child: PrimaryButton(
                label: 'Send OTP Code',
                disabled: _email.isEmpty,
                onTap: widget.onSendOTP,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
