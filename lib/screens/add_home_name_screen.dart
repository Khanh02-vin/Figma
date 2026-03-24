import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/progress_bar.dart';
import '../widgets/primary_button.dart';

class AddHomeNameScreen extends StatefulWidget {
  final VoidCallback onBack;
  final Function(String) onContinue;
  final VoidCallback onSkip;

  const AddHomeNameScreen({
    super.key,
    required this.onBack,
    required this.onContinue,
    required this.onSkip,
  });

  @override
  State<AddHomeNameScreen> createState() => _AddHomeNameScreenState();
}

class _AddHomeNameScreenState extends State<AddHomeNameScreen> {
  final _controller = TextEditingController(text: 'My Home');

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

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
                  Expanded(
                    child: ProgressBar(currentStep: 2, totalSteps: 4),
                  ),
                  const SizedBox(width: 16),
                  const Text(
                    '2 / 4',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                children: [
                  RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(
                      children: [
                        TextSpan(
                          text: 'Add ',
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: AppColors.foreground,
                          ),
                        ),
                        TextSpan(
                          text: 'Home',
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: AppColors.primary,
                          ),
                        ),
                        TextSpan(
                          text: ' Name',
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            color: AppColors.foreground,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Every smart home needs a name. What would you like to call yours?',
                    style: TextStyle(fontSize: 14, color: AppColors.mutedForeground),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  // Input
                  Container(
                    decoration: BoxDecoration(
                      color: AppColors.input,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                    child: TextField(
                      controller: _controller,
                      style: const TextStyle(
                        fontSize: 16,
                        color: AppColors.foreground,
                      ),
                      decoration: const InputDecoration(
                        hintText: 'Enter home name',
                        hintStyle: TextStyle(color: AppColors.mutedForeground),
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const Spacer(),
            // Footer
            Padding(
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  Expanded(
                    child: PrimaryButton(
                      label: 'Skip',
                      isSecondary: true,
                      onTap: widget.onSkip,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: PrimaryButton(
                      label: 'Continue',
                      disabled: _controller.text.trim().isEmpty,
                      onTap: () => widget.onContinue(_controller.text.trim()),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
