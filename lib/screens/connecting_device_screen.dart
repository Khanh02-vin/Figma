import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/models.dart';
import '../widgets/device_icon.dart';

class ConnectingDeviceScreen extends StatefulWidget {
  final Device device;
  final VoidCallback onBack;
  final VoidCallback onConnected;
  final bool showTabs;

  const ConnectingDeviceScreen({
    super.key,
    required this.device,
    required this.onBack,
    required this.onConnected,
    this.showTabs = false,
  });

  @override
  State<ConnectingDeviceScreen> createState() => _ConnectingDeviceScreenState();
}

class _ConnectingDeviceScreenState extends State<ConnectingDeviceScreen> {
  double _progress = 0;

  @override
  void initState() {
    super.initState();
    _startProgress();
  }

  void _startProgress() {
    Future.doWhile(() async {
      await Future.delayed(const Duration(milliseconds: 80));
      if (!mounted) return false;
      setState(() {
        _progress += 2;
        if (_progress >= 100) {
          Future.delayed(const Duration(milliseconds: 500), () {
            if (mounted) widget.onConnected();
          });
        }
      });
      return _progress < 100;
    });
  }

  String get _iconType {
    switch (widget.device.type) {
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
                  IconButton(onPressed: widget.onBack, icon: const Icon(Icons.arrow_back, size: 28)),
                  Expanded(
                    child: Text(
                      widget.showTabs ? 'Add Device' : 'Device Detected',
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600),
                    ),
                  ),
                  IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert, size: 28)),
                ],
              ),
            ),
            if (widget.showTabs)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: AppColors.muted.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      Expanded(child: _TabBtn('Nearby Devices', true, () {})),
                      Expanded(child: _TabBtn('Add Manual', false, () {})),
                    ],
                  ),
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
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _ConnBadge(icon: Icons.wifi),
                        const SizedBox(width: 8),
                        _ConnBadge(icon: Icons.bluetooth),
                        const SizedBox(width: 8),
                        const Text(
                          'Turn on your Wifi & Bluetooth',
                          style: TextStyle(fontSize: 12, color: AppColors.mutedForeground),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
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
                          widget.device.name,
                          style: const TextStyle(fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    // Progress circle with device
                    Expanded(
                      child: Center(
                        child: SizedBox(
                          width: 256,
                          height: 256,
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              // Background circle
                              SizedBox(
                                width: 256,
                                height: 256,
                                child: CircularProgressIndicator(
                                  value: 1,
                                  strokeWidth: 6,
                                  color: AppColors.border,
                                ),
                              ),
                              // Progress circle
                              SizedBox(
                                width: 256,
                                height: 256,
                                child: CircularProgressIndicator(
                                  value: _progress / 100,
                                  strokeWidth: 6,
                                  color: AppColors.primary,
                                  strokeCap: StrokeCap.round,
                                ),
                              ),
                              // Device
                              DeviceIcon(type: _iconType, size: 144),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // Progress text
                    Column(
                      children: [
                        const Text(
                          'Connecting...',
                          style: TextStyle(fontSize: 14, color: AppColors.mutedForeground),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${_progress.toInt()}%',
                          style: const TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: AppColors.primary,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
            // Footer
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  const Text(
                    "Can't connect with your devices?",
                    style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Learn more',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: AppColors.primary),
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

class _TabBtn extends StatelessWidget {
  final String label;
  final bool isActive;
  final VoidCallback onTap;
  const _TabBtn(this.label, this.isActive, this.onTap);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isActive ? AppColors.primary : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w500,
            color: isActive ? Colors.white : AppColors.mutedForeground,
          ),
        ),
      ),
    );
  }
}

class _ConnBadge extends StatelessWidget {
  final IconData icon;
  const _ConnBadge({required this.icon});
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
