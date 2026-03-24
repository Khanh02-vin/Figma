import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';
import '../widgets/device_icon.dart';

class DeviceConnectedScreen extends StatelessWidget {
  final Device device;
  final VoidCallback onGoHome;
  final VoidCallback onControlDevice;

  const DeviceConnectedScreen({
    super.key,
    required this.device,
    required this.onGoHome,
    required this.onControlDevice,
  });

  String get _iconType {
    switch (device.type) {
      case DeviceType.lamp: return 'lamp';
      case DeviceType.cctv: return 'cctv';
      case DeviceType.speaker: return 'speaker';
      default: return 'lamp';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            const Spacer(),
            // Success icon
            Container(
              width: 96,
              height: 96,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.check, color: Colors.white, size: 48, weight: 3),
            ),
            const SizedBox(height: 32),
            const Text(
              'Connected!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: AppColors.foreground,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'You have connected to ${device.name}.',
              style: const TextStyle(fontSize: 14, color: AppColors.mutedForeground),
            ),
            const SizedBox(height: 32),
            // Device image
            SizedBox(
              width: 192,
              height: 192,
              child: DeviceIcon(type: _iconType, size: 192),
            ),
            const Spacer(),
            // Footer buttons
            Padding(
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: onGoHome,
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        side: const BorderSide(color: AppColors.primary, width: 2),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30),
                        ),
                      ),
                      child: const Text(
                        'Go to Homepage',
                        style: TextStyle(
                          color: AppColors.primary,
                          fontWeight: FontWeight.w600,
                          fontSize: 15,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: onControlDevice,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30),
                        ),
                      ),
                      child: const Text(
                        'Control Device',
                        style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                      ),
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
