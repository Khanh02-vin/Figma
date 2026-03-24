import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';
import '../widgets/primary_button.dart';
import '../widgets/device_icon.dart';

class ConnectDeviceScreen extends StatelessWidget {
  final Device device;
  final VoidCallback onBack;
  final VoidCallback onConnect;

  const ConnectDeviceScreen({
    super.key,
    required this.device,
    required this.onBack,
    required this.onConnect,
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
            // Header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  IconButton(onPressed: onBack, icon: const Icon(Icons.arrow_back, size: 28)),
                  const Expanded(
                    child: Text(
                      'Add Device',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600),
                    ),
                  ),
                  IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert, size: 28)),
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    const Text(
                      'Connect to device',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.foreground),
                    ),
                    const SizedBox(height: 12),
                    // Connection info
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _ConnBadge(icon: Icons.wifi, label: 'Wifi'),
                        const SizedBox(width: 8),
                        _ConnBadge(icon: Icons.bluetooth, label: 'Bluetooth'),
                        const SizedBox(width: 8),
                        const Text(
                          'Turn on your Wifi & Bluetooth to connect',
                          style: TextStyle(fontSize: 12, color: AppColors.mutedForeground),
                        ),
                      ],
                    ),
                    if (device.type == DeviceType.lamp) ...[
                      const SizedBox(height: 12),
                      const Text(
                        'Turn on the light and confirm whether the light blinks rapidly.',
                        style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                        textAlign: TextAlign.center,
                      ),
                    ],
                    const SizedBox(height: 12),
                    // Device name
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 24,
                          height: 24,
                          decoration: BoxDecoration(
                            color: AppColors.primary.withValues(alpha: 0.1),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.check, size: 16, color: AppColors.primary),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          device.name,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w500,
                            color: AppColors.foreground,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    // Device image
                    Expanded(
                      child: Center(
                        child: Container(
                          width: 256,
                          height: 256,
                          decoration: BoxDecoration(
                            color: AppColors.muted.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(24),
                          ),
                          child: Center(
                            child: DeviceIcon(type: _iconType, size: 192),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // Footer
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  PrimaryButton(label: 'Connect', onTap: onConnect),
                  const SizedBox(height: 16),
                  const Text(
                    "Can't connect with your devices?",
                    style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Learn more',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: AppColors.primary,
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

class _ConnBadge extends StatelessWidget {
  final IconData icon;
  final String label;

  const _ConnBadge({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: AppColors.primary.withValues(alpha: 0.1),
        shape: BoxShape.circle,
      ),
      child: Icon(icon, size: 16, color: AppColors.primary),
    );
  }
}
