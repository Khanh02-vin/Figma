import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';
import '../widgets/progress_bar.dart';
import '../widgets/primary_button.dart';

class AddRoomsScreen extends StatefulWidget {
  final VoidCallback onBack;
  final Function(List<String>) onContinue;
  final VoidCallback onSkip;

  const AddRoomsScreen({
    super.key,
    required this.onBack,
    required this.onContinue,
    required this.onSkip,
  });

  @override
  State<AddRoomsScreen> createState() => _AddRoomsScreenState();
}

class _AddRoomsScreenState extends State<AddRoomsScreen> {
  late List<String> _selectedRooms;

  @override
  void initState() {
    super.initState();
    _selectedRooms = ['living', 'bedroom', 'bathroom', 'kitchen', 'dining', 'backyard'];
  }

  void _toggle(String id) {
    setState(() {
      if (_selectedRooms.contains(id)) {
        _selectedRooms = List.from(_selectedRooms)..remove(id);
      } else {
        _selectedRooms = List.from(_selectedRooms)..add(id);
      }
    });
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
                    child: ProgressBar(currentStep: 3, totalSteps: 4),
                  ),
                  const SizedBox(width: 16),
                  const Text(
                    '3 / 4',
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
                      text: 'Add ',
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.foreground),
                    ),
                    TextSpan(
                      text: 'Rooms',
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primary),
                    ),
                  ],
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                "Select the rooms in your house. Don't worry, you can always add more later.",
                style: TextStyle(fontSize: 14, color: AppColors.mutedForeground),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 20),
            // Room grid
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                  childAspectRatio: 1.1,
                ),
                itemCount: defaultRooms.length + 1,
                itemBuilder: (context, index) {
                  if (index == defaultRooms.length) {
                    // Add room button
                    return GestureDetector(
                      onTap: () {},
                      child: Container(
                        decoration: BoxDecoration(
                          color: AppColors.input,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: AppColors.primary.withValues(alpha: 0.3),
                            style: BorderStyle.solid,
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: 32,
                              height: 32,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(color: AppColors.primary, width: 2),
                              ),
                              child: const Icon(Icons.add, size: 20, color: AppColors.primary),
                            ),
                            const SizedBox(height: 8),
                            const Text(
                              'Add Room',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                                color: AppColors.foreground,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }

                  final room = defaultRooms[index];
                  final isSelected = _selectedRooms.contains(room['id']);
                  return GestureDetector(
                    onTap: () => _toggle(room['id'] as String),
                    child: Container(
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppColors.primary.withValues(alpha: 0.05)
                            : AppColors.input,
                        borderRadius: BorderRadius.circular(16),
                        border: isSelected
                            ? Border.all(color: AppColors.primary, width: 2)
                            : null,
                      ),
                      child: Stack(
                        children: [
                          Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  room['icon'] as IconData,
                                  size: 32,
                                  color: AppColors.primary,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  room['name'] as String,
                                  style: const TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w500,
                                    color: AppColors.foreground,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                          ),
                          if (isSelected)
                            Positioned(
                              top: 8,
                              right: 8,
                              child: Container(
                                width: 24,
                                height: 24,
                                decoration: const BoxDecoration(
                                  color: AppColors.primary,
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(Icons.check, size: 14, color: Colors.white),
                              ),
                            ),
                        ],
                      ),
                    ),
                  );
                },
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
                      onTap: () => widget.onContinue(_selectedRooms),
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
