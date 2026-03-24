import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/primary_button.dart';

class CreateNewPasswordScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onSave;

  const CreateNewPasswordScreen({
    super.key,
    required this.onBack,
    required this.onSave,
  });

  @override
  State<CreateNewPasswordScreen> createState() => _CreateNewPasswordScreenState();
}

class _CreateNewPasswordScreenState extends State<CreateNewPasswordScreen> {
  String _newPassword = 'smartify1234';
  String _confirmPassword = 'smartify1234';
  bool _showNew = false;
  bool _showConfirm = false;

  bool get _isValid => _newPassword.length >= 8 && _newPassword == _confirmPassword;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
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
                      'Secure Your Account',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: AppColors.foreground,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Almost there! Create a new password for your Smartify account to keep it secure. Remember to choose a strong and unique password.',
                      style: TextStyle(fontSize: 14, color: AppColors.mutedForeground, height: 1.5),
                    ),
                    const SizedBox(height: 32),
                    // New Password
                    const Text('New Password', style: TextStyle(fontWeight: FontWeight.w500, fontSize: 14)),
                    const SizedBox(height: 8),
                    Container(
                      decoration: BoxDecoration(
                        color: AppColors.muted.withValues(alpha: 0.3),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Row(
                        children: [
                          const Padding(
                            padding: EdgeInsets.only(left: 16),
                            child: Icon(Icons.lock_outlined, color: AppColors.mutedForeground),
                          ),
                          Expanded(
                            child: TextField(
                              controller: TextEditingController(text: _newPassword),
                              obscureText: !_showNew,
                              onChanged: (v) => setState(() => _newPassword = v),
                              decoration: const InputDecoration(
                                border: InputBorder.none,
                                contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 16),
                              ),
                            ),
                          ),
                          IconButton(
                            icon: Icon(
                              _showNew ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                              color: AppColors.mutedForeground,
                            ),
                            onPressed: () => setState(() => _showNew = !_showNew),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),
                    // Confirm Password
                    const Text('Confirm New Password', style: TextStyle(fontWeight: FontWeight.w500, fontSize: 14)),
                    const SizedBox(height: 8),
                    Container(
                      decoration: BoxDecoration(
                        color: AppColors.muted.withValues(alpha: 0.3),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Row(
                        children: [
                          const Padding(
                            padding: EdgeInsets.only(left: 16),
                            child: Icon(Icons.lock_outlined, color: AppColors.mutedForeground),
                          ),
                          Expanded(
                            child: TextField(
                              controller: TextEditingController(text: _confirmPassword),
                              obscureText: !_showConfirm,
                              onChanged: (v) => setState(() => _confirmPassword = v),
                              decoration: const InputDecoration(
                                border: InputBorder.none,
                                contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 16),
                              ),
                            ),
                          ),
                          IconButton(
                            icon: Icon(
                              _showConfirm ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                              color: AppColors.mutedForeground,
                            ),
                            onPressed: () => setState(() => _showConfirm = !_showConfirm),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // Footer
            Padding(
              padding: const EdgeInsets.all(24),
              child: PrimaryButton(
                label: 'Save New Password',
                disabled: !_isValid,
                onTap: widget.onSave,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
