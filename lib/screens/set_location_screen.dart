import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/progress_bar.dart';
import '../widgets/primary_button.dart';

class SetLocationScreen extends StatefulWidget {
  final VoidCallback onBack;
  final Function(String) onContinue;
  final VoidCallback onSkip;

  const SetLocationScreen({
    super.key,
    required this.onBack,
    required this.onContinue,
    required this.onSkip,
  });

  @override
  State<SetLocationScreen> createState() => _SetLocationScreenState();
}

class _SetLocationScreenState extends State<SetLocationScreen> {
  bool _showPermissionModal = true;
  bool _locationEnabled = false;
  final _addressController = TextEditingController();

  void _enableLocation() {
    setState(() {
      _locationEnabled = true;
      _addressController.text = '701 7th Ave, New York, 10036, USA';
      _showPermissionModal = false;
    });
  }

  @override
  void dispose() {
    _addressController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Scaffold(
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
                        child: ProgressBar(currentStep: 4, totalSteps: 4),
                      ),
                      const SizedBox(width: 16),
                      const Text(
                        '4 / 4',
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
                  child: RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(
                      children: [
                        TextSpan(
                          text: 'Set Home ',
                          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.foreground),
                        ),
                        TextSpan(
                          text: 'Location',
                          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primary),
                        ),
                      ],
                    ),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 24),
                  child: Text(
                    "Pin your home's location to enhance location-based features. Privacy is our priority.",
                    style: TextStyle(fontSize: 14, color: AppColors.mutedForeground),
                    textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(height: 16),
                // Map area
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: Column(
                      children: [
                        Container(
                          height: 220,
                          width: double.infinity,
                          decoration: BoxDecoration(
                            color: AppColors.muted,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Stack(
                            children: [
                              // Grid pattern
                              CustomPaint(
                                size: const Size(double.infinity, 220),
                                painter: _GridPainter(),
                              ),
                              // Street labels
                              const Positioned(
                                top: 20,
                                left: 16,
                                child: Text(
                                  'Clayton St',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: AppColors.mutedForeground,
                                    decoration: TextDecoration.none,
                                  ),
                                ),
                              ),
                              const Positioned(
                                top: 60,
                                right: 20,
                                child: Text(
                                  'Market St',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: AppColors.mutedForeground,
                                    decoration: TextDecoration.none,
                                  ),
                                ),
                              ),
                              // Location pin
                              if (_locationEnabled)
                                Center(
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Container(
                                        width: 48,
                                        height: 48,
                                        decoration: const BoxDecoration(
                                          color: AppColors.primary,
                                          shape: BoxShape.circle,
                                        ),
                                        child: const Icon(Icons.location_on, color: Colors.white, size: 28),
                                      ),
                                      Container(
                                        width: 0,
                                        height: 0,
                                        decoration: const BoxDecoration(
                                          border: Border(
                                            left: BorderSide(width: 8, color: Colors.transparent),
                                            right: BorderSide(width: 8, color: Colors.transparent),
                                            top: BorderSide(width: 8, color: AppColors.primary),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        // Address input
                        const Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            'Address Details',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                              color: AppColors.foreground,
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          decoration: BoxDecoration(
                            color: AppColors.input,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                          child: TextField(
                            controller: _addressController,
                            style: const TextStyle(fontSize: 15, color: AppColors.foreground),
                            decoration: const InputDecoration(
                              hintText: 'Enter your address',
                              hintStyle: TextStyle(color: AppColors.mutedForeground),
                              border: InputBorder.none,
                            ),
                            onChanged: (_) => setState(() {}),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
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
                          disabled: _addressController.text.trim().isEmpty,
                          onTap: () => widget.onContinue(_addressController.text.trim()),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        // Permission Modal
        if (_showPermissionModal)
          Container(
            color: Colors.black54,
            child: Center(
              child: Container(
                margin: const EdgeInsets.all(32),
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 64,
                      height: 64,
                      decoration: const BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.location_on, color: Colors.white, size: 32),
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      'Enable Location',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: AppColors.foreground,
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Please activate the location feature, so we can find your home address.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 14, color: AppColors.mutedForeground),
                    ),
                    const SizedBox(height: 24),
                    PrimaryButton(label: 'Enable Location', onTap: _enableLocation),
                    const SizedBox(height: 12),
                    PrimaryButton(
                      label: 'Not Now',
                      isSecondary: true,
                      onTap: () => setState(() => _showPermissionModal = false),
                    ),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }
}

class _GridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.mutedForeground.withValues(alpha: 0.2)
      ..strokeWidth = 0.5;

    for (var x = 0.0; x < size.width; x += 40) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }
    for (var y = 0.0; y < size.height; y += 40) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
