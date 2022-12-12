export class CommonUtilities {
  private static reMethod: RegExp = /^(function|object)$/;
  private static reUnknown: RegExp = /^unknown$/;

  public static isHostMethod(obj: any, method: string): boolean {
    if (!obj) {
      return false;
    }

    const t: string = typeof obj[method];

    return this.reUnknown.test(t) || (this.reMethod.test(t) && Boolean(obj)) || false;
  }
}
